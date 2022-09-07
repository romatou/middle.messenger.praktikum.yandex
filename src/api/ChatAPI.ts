import HTTPTransport from '../modules/HTTPTransport'
import BaseAPI from '../modules/BaseAPI'

const BASE_URL = 'https://ya-praktikum.tech/api/v2/chats'

export default class ChatAPI extends BaseAPI {
  create() {
    return HTTPTransport.post(`${BASE_URL}`, { title: 'string' })
  }

  request() {
    return HTTPTransport.get(`${BASE_URL}`)
  }
}
