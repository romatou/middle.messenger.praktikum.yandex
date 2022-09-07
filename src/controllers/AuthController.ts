//import Store from '../modules/Store'
import AuthAPI from '../api/AuthAPI'
import Router from '../modules/Router'
import store from '../modules/Store'
import UserController from './UserController'
import { validateSubmit } from '../utils/validate'
import { LoginFormModel, RegisterFormModel } from '../types/FormModel'

class AuthController {
  public async getUser() {
    try {
      const res = await AuthAPI.getUser()

      if (res.status !== 200) {
        console.error(`Ошибка запроса: ${res.reason}`)
        store.set('user', null)
      } else {
        store.set('user', res.response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  public async request(data: LoginFormModel) {
    const isValid = validateSubmit(data)

    if (isValid) {
      const inputs = data.target.querySelectorAll('input')
      const userData = {}

      inputs.forEach(input => {
        userData[input.name] = input.value
      })
      return await AuthAPI.request(userData)
        .then(res => {
          if (res.status !== 200) {
            const form = document.querySelector('.form')
            const err = document.createElement('span')
            err.classList.add('error')
            const response = Object.values(res.response)
            err.innerHTML = response[0]
            form?.appendChild(err)
            return res.response
          }

          Router.go('/messenger')
        })
        .catch(err => {
          console.log(err)
          return err
        })
    }
  }

  public async create(data: RegisterFormModel) {
    const isValid = validateSubmit(data)

    if (isValid) {
      const inputs = data.target.querySelectorAll('input')
      const userData = {}

      inputs.forEach(input => {
        userData[input.name] = input.value
      })

      return await AuthAPI.create(userData)
        .then(() => {
          UserController.getUser()
        })
        .then(res => {
          Router.go('/messenger')
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }

  public delete() {
    return AuthAPI.delete().then(res => {
      Router.go('/')
    })
  }
}

export default new AuthController()
