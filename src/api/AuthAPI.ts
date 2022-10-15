import HTTPTransport from '../modules/HTTPTransport'
import { FormModel } from '../types/FormModel'

class AuthAPI {
  private _xhr: HTTPTransport

  constructor() {
    this._xhr = new HTTPTransport()
  }

  public getUser<Response>(): Promise<Response> {
    return this._xhr.get('/auth/user')
  }

  public request<Response>(user: FormModel): Promise<Response> {
    return this._xhr.post('/auth/signin', {
      data: user,
    })
  }

  public create<Response>(user: FormModel): Promise<Response> {
    return this._xhr.post('/auth/signup', {
      data: user,
    })
  }

  public delete<Response>(): Promise<Response> {
    return this._xhr.post('/auth/logout')
  }
}

export default new AuthAPI()
