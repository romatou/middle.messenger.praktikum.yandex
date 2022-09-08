import BaseAPI from '../modules/BaseAPI'
import HTTPTransport from '../modules/HTTPTransport'

class UserAPI extends BaseAPI {
  public async getUser() {
    return HTTPTransport.get('/auth/user')
  }

  public async update(data) {
    return HTTPTransport.put('/user/profile', {
      headers: { 'Content-Type': 'application/json' },
      data: data,
    })
  }

  public async updatePassword(data) {
    return HTTPTransport.put('/user/password', {
      headers: { 'Content-Type': 'application/json' },
      data: data,
    })
  }

  public async updateAvatar(data) {
    return HTTPTransport.put('/user/profile/avatar', {
      credentials: 'include',
      mode: 'cors',
      data: data,
    })
  }
}

export default new UserAPI()
