import HTTPTransport from '../modules/HTTPTransport'
import BaseAPI from '../modules/BaseAPI'

class ChatAPI extends BaseAPI {
  public requestChats() {
    return HTTPTransport.get('/chats', { data: { limit: 6 } })
  }

  public createChat(data = {}) {
    return HTTPTransport.post('/chats', {
      headers: { 'content-type': 'application/json' },
      data: data,
    })
  }

  public deleteChat(chatId) {
    const parsedData = JSON.stringify({ chatId: chatId })
    return HTTPTransport.delete('/chats', {
      headers: { 'content-type': 'application/json' },
      data: parsedData,
    })
  }

  public addUser(user, chat) {
    const strData = JSON.stringify({
      users: [user],
      chatId: chat,
    })

    return HTTPTransport.put('/chats/users', {
      headers: { 'content-type': 'application/json' },
      data: strData,
    })
  }

  public deleteUser(user, chatId) {
    const strData = JSON.stringify({
      users: [user],
      chatId: chatId,
    })

    return HTTPTransport.put('/chats/users', {
      headers: { 'content-type': 'application/json' },
      data: strData,
    })
  }

  public getChatUsers(id) {
    return HTTPTransport.get(`/chats/${id}/users`)
  }

  public getChatToken(id) {
    return HTTPTransport.post(`/chats/token/${id}`)
  }
}

export default new ChatAPI()
