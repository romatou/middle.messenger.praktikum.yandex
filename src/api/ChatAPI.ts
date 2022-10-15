import HTTPTransport from '../modules/HTTPTransport'

class ChatAPI {
  private _xhr: HTTPTransport

  constructor() {
    this._xhr = new HTTPTransport()
  }

  public requestChats<Response>(): Promise<Response> {
    return this._xhr.get('/chats', { data: { limit: 6 } })
  }

  public createChat<Response>(data: Record<string, string>): Promise<Response> {
    return this._xhr.post('/chats', {
      data: data,
    })
  }

  public deleteChat<Response>(chatId: number): Promise<Response> {
    return this._xhr.delete('/chats', {
      data: { chatId: chatId },
    })
  }

  public addUser<Response>(user: number, chatId: number): Promise<Response> {
    return this._xhr.put('/chats/users', {
      data: { users: [user], chatId: chatId },
    })
  }

  public deleteUser<Response>(user: number, chatId: number): Promise<Response> {
    return this._xhr.put('/chats/users', {
      data: { users: [user], chatId: chatId },
    })
  }

  public getChatUsers<Response>(id: number): Promise<Response> {
    return this._xhr.get(`/chats/${id}/users`)
  }

  public getChatToken<Response>(id: number): Promise<Response> {
    return this._xhr.post(`/chats/token/${id}`, { headers: {} })
  }
}

export default new ChatAPI()
