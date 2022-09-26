//import Store from '../modules/Store'
import AuthAPI from '../api/AuthAPI'
import Router from '../modules/Router'
import store from '../modules/Store'
import { validateSubmit } from '../utils/validate'
import { LoginFormModel, RegisterFormModel } from '../types/FormModel'

class AuthController {
  public async getUser() {
    await AuthAPI.getUser()
      .then((res: any): void => {
        if (res.status === 200) {
          localStorage.setItem('user', res.response)
          const user = JSON.parse(res.response)
          store.set('user', user)

          if (window.location.pathname === '/') {
            Router.go('/messenger')
          }
        } else {
          throw Error(res.response)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  public async request(data: LoginFormModel) {
    try {
      const isValid = validateSubmit(data)

      if (!isValid) {
        throw new Error('Ошибка валидации')
      }

      await AuthAPI.request(data).then(res => {
        if (res.status === 200) {
          this.getUser()
          Router.go('/messenger')
        } else if (res.status === 400) {
          const response = JSON.parse(res.response)

          if (res.reason == 'User already in system') {
            Router.go('/messenger')
          } else {
            throw res.reason
          }
        } else {
          console.error(res.response)
        }
      })
    } catch (err) {
      console.log('Пользователь не авторизован по причине:', err)
    }
  }

  public async create(data: RegisterFormModel) {
    try {
      const isValid = validateSubmit(data)

      if (!isValid) {
        throw new Error('Ошибка валидации')
      }

      const regData = await AuthAPI.create(JSON.stringify(data)).then(res => {
        if (res.status === 200) {
          UserController.getUser()
          return true
        } else {
          return res.response
        }
      })

      if (regData) {
        Router.go('/messenger')
      } else {
        throw Error
      }
    } catch (err) {
      console.error('Пользователь не зарегистрирован по причине:', err)
    }
  }

  public async delete() {
    return await AuthAPI.delete().then(res => {
      Router.go('/')
    })
  }
}

export default new AuthController()
