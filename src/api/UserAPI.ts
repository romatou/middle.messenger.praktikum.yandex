import HTTPTransport from '../modules/HTTPTransport'

class UserAPI {
  public async getUser<Response>(): Promise<Response> {
    return HTTPTransport.get('/auth/user')
  }

  public async update<Response>(
    data: Record<string, string>
  ): Promise<Response> {
    return HTTPTransport.put('/user/profile', {
      headers: { 'Content-Type': 'application/json' },
      data: data,
    })
  }

  public async updatePassword<Response>(
    data: Record<string, string>
  ): Promise<Response> {
    return HTTPTransport.put('/user/password', {
      data: data,
    })
  }

  public async updateAvatar<Response>(
    data: Record<string, string>
  ): Promise<Response> {
    return HTTPTransport.put('/user/profile/avatar', {
      headers: {},
      credentials: 'include',
      mode: 'cors',
      data: data,
    })
  }
}

export default new UserAPI()
