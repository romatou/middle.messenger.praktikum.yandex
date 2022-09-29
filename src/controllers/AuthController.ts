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
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  public async request(data: LoginFormModel) {
    const isValid = validateSubmit(data)

    if (!isValid) {
      throw new Error('Ошибка валидации')
    }

    await AuthAPI.request(data)
      .then(res => {
        if (res.status === 200) {
          this.getUser()
        } else {
          const response = JSON.parse(res.response)
          throw Error(response.reason)
        }
      })
      .catch(err => {
        console.error('Пользователь не авторизован по причине:', err)
      })
  }

  public async create(data: RegisterFormModel) {
    const isValid = validateSubmit(data)

    if (!isValid) {
      throw new Error('Ошибка валидации')
    }

    await AuthAPI.create(data)
      .then(res => {
        if (res.status === 200) {
          this.getUser()
          ChatController.requestChats()
          Router.go('/messenger')
        } else {
          throw Error(res.response)
        }
      })
      .catch(err => {
        console.error('Пользователь не зарегистрирован по причине:', err)
      })
  }

  public async delete() {
    return await AuthAPI.delete().then(res => {
      Router.go('/')
    })
  }
}

export default new AuthController()
