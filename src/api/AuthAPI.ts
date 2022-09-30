import HTTPTransport from '../modules/HTTPTransport'
import { LoginFormModel, RegisterFormModel } from '../types/FormModel'

class AuthAPI {
  public getUser<Response>(): Promise<Response> {
    return HTTPTransport.get('/auth/user')
  }

  public request<Response>(user: LoginFormModel): Promise<Response> {
    return HTTPTransport.post('/auth/signin', {
      data: user,
    })
  }

  public create<Response>(user: RegisterFormModel): Promise<Response> {
    return HTTPTransport.post('/auth/signup', {
      data: user,
    })
  }

  public delete<Response>(): Promise<Response> {
    return HTTPTransport.post('/auth/logout')
  }
}

export default new AuthAPI()
