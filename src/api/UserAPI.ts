import HTTPTransport from '../modules/HTTPTransport'
import { UpdateUserData, UpdateUserPassword } from '../types/FormModel'

const xhr = new HTTPTransport()

class UserAPI {
  public async getUser<Response>(): Promise<Response> {
    return xhr.get('/auth/user')
  }

  public async update<Response>(data: UpdateUserData): Promise<Response> {
    return xhr.put('/user/profile', {
      data: data,
    })
  }

  public async updatePassword<Response>(
    data: UpdateUserPassword
  ): Promise<Response> {
    return xhr.put('/user/password', {
      data: data,
    })
  }

  public async updateAvatar<Response>(data: FormData): Promise<Response> {
    return xhr.put('/user/profile/avatar', {
      headers: {
        'Access-Control-Allow-Credentials': 'true',
      },
      data: data,
    })
  }
}

export default new UserAPI()
