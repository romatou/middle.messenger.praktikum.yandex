import HTTPTransport from '../modules/HTTPTransport'
import { FormModel } from '../types/FormModel'

class UserAPI {
  private _xhr: HTTPTransport

  constructor() {
    this._xhr = new HTTPTransport()
  }

  public async getUser<Response>(): Promise<Response> {
    return this._xhr.get('/auth/user')
  }

  public async update<Response>(data: FormModel): Promise<Response> {
    return this._xhr.put('/user/profile', {
      data: data,
    })
  }

  public async updatePassword<Response>(data: FormModel): Promise<Response> {
    return this._xhr.put('/user/password', {
      data: data,
    })
  }

  public async updateAvatar<Response>(data: FormData): Promise<Response> {
    return this._xhr.put('/user/profile/avatar', {
      headers: {
        'Access-Control-Allow-Credentials': 'true',
      },
      data: data,
    })
  }
}

export default new UserAPI()
