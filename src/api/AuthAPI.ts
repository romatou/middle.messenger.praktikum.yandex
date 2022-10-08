import HTTPTransport from '../modules/HTTPTransport'
import { LoginFormModel, RegisterFormModel } from '../types/FormModel'

const xhr = new HTTPTransport()

class AuthAPI {
  public getUser<Response>(): Promise<Response> {
    return xhr.get('/auth/user')
  }

  public request<Response>(user: LoginFormModel): Promise<Response> {
    return xhr.post('/auth/signin', {
      data: user,
    })
  }

  public create<Response>(user: RegisterFormModel): Promise<Response> {
    return xhr.post('/auth/signup', {
      data: user,
    })
  }

  public delete<Response>(): Promise<Response> {
    return xhr.post('/auth/logout')
  }
}

export default new AuthAPI()
