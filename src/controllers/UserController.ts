import UserAPI from '../api/UserAPI'
import store from '../modules/Store'
import Router from '../modules/Router'
import { FormModel } from '../types/FormModel'

class UserController {
  public async getUser() {
    try {
      const response: XMLHttpRequest = await UserAPI.getUser()

      if (response.status === 200) {
        const parsedData = JSON.parse(response.response)
        store.set('user', parsedData)
      } else {
        throw Error(response.response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  public async update(data: FormModel) {
    try {
      const response: XMLHttpRequest = await UserAPI.update(data)

      if (response.status === 200) {
        const userData = JSON.parse(response.response)
        store.set('user', userData)
        Router.go('/settings')
      } else {
        throw Error(response.response)
      }
    } catch (err) {
      console.log(err)
    }
  }

  public async updatePassword(data: FormModel) {
    try {
      const response: XMLHttpRequest = await UserAPI.updatePassword(data)

      if (response.status === 200) {
        Router.go('/settings')
      } else {
        throw Error(response.response)
      }
    } catch (err) {
      console.log(err)
    }
  }

  public async updateAvatar(data: FormData) {
    try {
      const response: XMLHttpRequest = await UserAPI.updateAvatar(data)

      if (response.status === 200) {
        const newData = JSON.parse(response.response)
        store.set('user', newData)
        Router.go('/settings')
      } else {
        throw Error(response.response)
      }
    } catch (err) {
      console.log('Аватар не изменен', err)
    }
  }
}

export default new UserController()
