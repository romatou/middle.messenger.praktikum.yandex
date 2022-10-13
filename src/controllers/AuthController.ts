import AuthAPI from '../api/AuthAPI'
import Router from '../modules/Router'
import store from '../modules/Store'
import { validateSubmit } from '../utils/validate'
import { FormModel } from '../types/FormModel'
import ChatController from './ChatController'

class AuthController {
  public async getUser() {
    const response: XMLHttpRequest = await AuthAPI.getUser()

    try {
      if (response.status === 200) {
        const user = await JSON.parse(response.response)
        store.set('user', user)
        if (window.location.pathname === '/') {
          Router.go('/messenger')
        }
      } else {
        throw Error(response.response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  public async request(data: FormModel) {
    const isValid = validateSubmit(data)

    if (!isValid) {
      throw new Error('Ошибка валидации')
    }

    const response: XMLHttpRequest = await AuthAPI.request(data)

    try {
      if (response.status === 200) {
        this.getUser()
      } else {
        const res = JSON.parse(response.response)
        throw Error(res.reason)
      }
    } catch (err) {
      console.error('Пользователь не авторизован по причине:', err)
    }
  }

  public async create(data: FormModel) {
    const isValid = validateSubmit(data)

    if (!isValid) {
      throw new Error('Ошибка валидации')
    }

    try {
      const request: XMLHttpRequest = await AuthAPI.create(data)

      if (request.status === 200) {
        this.getUser()
        ChatController.requestChats()
        Router.go('/messenger')
      } else {
        throw Error(request.response)
      }
    } catch (err) {
      console.error('Пользователь не зарегистрирован по причине:', err)
    }
  }

  public delete() {
    AuthAPI.delete().then((): void => {
      Router.go('/')
    })
  }
}

export default new AuthController()
