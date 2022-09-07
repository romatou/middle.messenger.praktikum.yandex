import HTTPTransport from '../modules/HTTPTransport'
import BaseAPI from '../modules/BaseAPI'
import BASE_URL from '../consts/BASE_URL'
import { LoginFormModel, RegisterFormModel } from '../types/FormModel'
import Store, { StoreEvents } from '../modules/Store'

class AuthAPI extends BaseAPI {
  public getUser() {
    return HTTPTransport.get(`${BASE_URL}/auth/user`, {})
  }

  public request(user: LoginFormModel) {
    return HTTPTransport.post(`${BASE_URL}/auth/signin`, {
      headers: { 'Content-Type': 'application/json' },
      data: user,
    })
  }

  public create(user: RegisterFormModel) {
    return HTTPTransport.post(`${BASE_URL}/auth/signup`, {
      headers: { 'Content-Type': 'application/json' },
      data: user,
    })
  }

  public delete() {
    return HTTPTransport.post(`${BASE_URL}/auth/logout`, {})
  }
}

export default new AuthAPI()
