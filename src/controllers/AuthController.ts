//import Store from '../modules/Store'
import AuthAPI from '../api/AuthAPI'
import Router from '../modules/Router'
import store from '../modules/Store'
import { validateSubmit } from '../utils/validate'
import { LoginFormModel, RegisterFormModel } from '../types/FormModel'
import ChatController from './ChatController'

class AuthController {
  public async getUser() {
    await AuthAPI.getUser()
      .then((res: any): void => {
        if (res.status === 200) {
          const user = JSON.parse(res.response)
          store.set('user', user)
          if (window.location.pathname === '/') {
            Router.go('/messenger')
          }
        } else {
          throw new Error()
        }
      })
      .catch((err: Error) => {
        console.error(err)
      })
  }

  public async request(data: LoginFormModel) {
    const isValid = validateSubmit(data)

    if (isValid) {
      await AuthAPI.request(data)
        .then((res: any): void | never => {
          if (res.status === 200) {
            this.getUser()
          } else {
            const response = JSON.parse(res.response)
            throw Error(response.reason)
          }
        })
        .catch((err: Error) => {
          console.error('Пользователь не авторизован по причине:', err)
        })
    }

    throw new Error('Ошибка валидации')
  }

  public async create(data: RegisterFormModel) {
    const isValid = validateSubmit(data)

    if (!isValid) {
      throw new Error('Ошибка валидации')
    }

    await AuthAPI.create(data)
      .then((res: any): void | Error => {
        if (res.status === 200) {
          this.getUser()
          ChatController.requestChats()
          Router.go('/messenger')
        } else {
          throw Error(res.response)
        }
      })
      .catch((err: Error) => {
        console.error('Пользователь не зарегистрирован по причине:', err)
      })
  }

  public async delete() {
    return await AuthAPI.delete().then((): void => {
      Router.go('/')
    })
  }
}

export default new AuthController()
