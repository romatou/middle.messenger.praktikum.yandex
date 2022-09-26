import HTTPTransport from '../modules/HTTPTransport'

class ChatAPI {
  public requestChats<Response>(): Promise<Response> {
    return HTTPTransport.get('/chats', { data: { limit: 6 } })
  }

  public createChat<Response>(data: any): Promise<Response> {
    return HTTPTransport.post('/chats', {
      data: data,
    })
  }

  public deleteChat<Response>(chatId: number): Promise<Response> {
    return HTTPTransport.delete('/chats', {
      data: { chatId: chatId },
    })
  }

  public addUser<Response>(user: number, chatId: number): Promise<Response> {
    return HTTPTransport.put('/chats/users', {
      data: { users: [user], chatId: chatId },
    })
  }

  public deleteUser<Response>(user: number, chatId: number): Promise<Response> {
    return HTTPTransport.put('/chats/users', {
      data: { users: [user], chatId: chatId },
    })
  }

  public getChatUsers<Response>(id: number): Promise<Response> {
    return HTTPTransport.get(`/chats/${id}/users`)
  }

  public getChatToken<Response>(id: number): Promise<Response> {
    return HTTPTransport.post(`/chats/token/${id}`, { headers: {} })
  }
}

export default new ChatAPI()
