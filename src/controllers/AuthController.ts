//import Store from '../modules/Store'
import AuthAPI from '../api/AuthAPI'
import Router from '../modules/Router'
import store from '../modules/Store'
import { validateSubmit } from '../utils/validate'
import { LoginFormModel, RegisterFormModel } from '../types/FormModel'

class AuthController {
  public async getUser(isAuth: boolean) {
    try {
      const res = await AuthAPI.getUser()

      if (res.status === 200) {
        isAuth = true
        const user = JSON.parse(res.response)
        store.set('user', user)

        if (window.location.pathname === '/') {
          Router.go('/messenger')
        }
      }
    } catch (err) {
      console.log(err.response)
    }

    return isAuth
  }

  public async request(data: LoginFormModel) {
    try {
      const isValid = validateSubmit(data)

      if (!isValid) {
        throw new Error('Ошибка валидации')
      }

      const request = await AuthAPI.request(JSON.stringify(data))

      if (request.status === 200) {
        this.getUser()
        Router.go('/messenger')
      } else if (request.status === 400) {
        const response = JSON.parse(request.response)

        if (response.reason == 'User already in system') {
          Router.go('/messenger')
        } else {
          throw response.reason
        }
      } else {
        console.error(request.response)
      }
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

      const regData = await AuthAPI.create(JSON.stringify(data))

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
