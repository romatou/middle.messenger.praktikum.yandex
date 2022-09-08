import UserAPI from '../api/UserAPI'
import store from '../modules/Store'
import Router from '../modules/Router'

class UserController {
  public async getUser() {
    await UserAPI.getUser()
      .then(data => {
        store.set('user', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  public async update(data) {
    await UserAPI.update(JSON.stringify(data))
      .then(res => {
        return res.response
      })
      .then(data => {
        const userData = JSON.parse(data)
        store.set('user', userData)
        Router.go('/settings')
      })
      .catch(err => {
        console.log(err)
      })
  }

  public async updatePassword(data) {
    await UserAPI.updatePassword(JSON.stringify(data))
      .then(res => {
        if (res.status === 200) {
          Router.go('/settings')
        } else {
          console.log(res.reason)
          return
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  public async updateAvatar(data) {
    await UserAPI.updateAvatar(data)
      .then(res => {
        if (res.status === 200) {
          const newData = JSON.parse(res.response)
          store.set('user', newData)
          Router.go('/settings')
        } else {
          console.log(res.reason)
          return
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default new UserController()
