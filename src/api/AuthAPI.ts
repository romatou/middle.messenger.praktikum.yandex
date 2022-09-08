import HTTPTransport from '../modules/HTTPTransport'
import BaseAPI from '../modules/BaseAPI'
import { LoginFormModel, RegisterFormModel } from '../types/FormModel'
import Store, { StoreEvents } from '../modules/Store'
import UserController from '../controllers/UserController'

class AuthAPI extends BaseAPI {
  public getUser() {
    return HTTPTransport.get('/auth/user')
  }

  public request(user: LoginFormModel) {
    return HTTPTransport.post('/auth/signin', {
      headers: { 'Content-Type': 'application/json' },
      data: user,
    })
  }

  public create(user: RegisterFormModel) {
    return HTTPTransport.post('/auth/signup', {
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      data: user,
    }).then(res => {
      if (res.status === 200) {
        UserController.getUser()
        return true
      } else {
        return res.response
      }
    })
  }

  public delete() {
    return HTTPTransport.post('/auth/logout')
  }
}

export default new AuthAPI()
