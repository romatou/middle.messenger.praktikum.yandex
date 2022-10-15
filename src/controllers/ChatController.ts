import store from '../modules/Store'
import ChatAPI from '../api/ChatAPI'
import { validateSubmit } from '../utils/validate'
import Socket from '../modules/Socket'

class ChatController {
  private _socket: Socket | null

  constructor() {
    this._socket = null
  }

  public async requestChats() {
    try {
      const response: XMLHttpRequest = await ChatAPI.requestChats()

      const data = JSON.parse(response.response)
      store.set('chats', data)
    } catch (err) {
      console.error(err)
    }
  }

  public async createChat(data: Record<string, any>) {
    try {
      const response: XMLHttpRequest = await ChatAPI.createChat(data)
      if (response.status === 200) {
        this.requestChats()
        document.querySelector('.modal')?.remove()
      } else {
        const error = JSON.parse(response.response)
        throw Error(error.error)
      }
    } catch (err) {
      console.error(err)
    }
  }

  public async deleteChat(chatId: number) {
    try {
      const response: XMLHttpRequest = await ChatAPI.deleteChat(chatId)

      if (response.status === 200) {
        this.requestChats()
      } else {
        throw Error(response.response)
      }
      document.querySelector('.modal')?.remove()
    } catch (err) {
      console.error(`Причина: ${err}`)
    }
  }

  public async addUser(user: number, chat: number) {
    try {
      const response: XMLHttpRequest = await ChatAPI.addUser(user, chat)

      if (response.status === 200) {
        document.querySelector('.modal')?.remove()
      } else {
        throw Error(response.response)
      }
    } catch (err) {
      console.log(err)
    }
  }

  public async deleteUser(user: number, chatId: number) {
    try {
      const response: XMLHttpRequest = await ChatAPI.deleteUser(user, chatId)

      if (response.status === 200) {
        document.querySelector('.modal')?.remove()
      }
    } catch (err) {
      console.log(err)
    }
  }

  public async connectToChat(id: number) {
    let userId = 0
    let token = ''

    const userIdRequest: XMLHttpRequest = await ChatAPI.getChatUsers(id)

    if (userIdRequest) {
      const response = JSON.parse(userIdRequest.response)

      const currentUser = response.find(
        (user: any) => user.id === store.getState().user.id
      )
      userId = currentUser.id
    }

    const tokenIdRequest: XMLHttpRequest = await ChatAPI.getChatToken(id)

    if (tokenIdRequest) {
      const response: Record<string, any> = JSON.parse(tokenIdRequest.response)
      token = response.token
    }

    this._socket = new Socket(userId, id, token)
  }

  public sendMessage(message: any) {
    const isValid = validateSubmit(message)

    if (isValid) {
      this._socket?.sendMessage(message)
    }
  }
}

export default new ChatController()
