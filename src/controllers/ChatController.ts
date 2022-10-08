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
    await ChatAPI.requestChats()
      .then((res: any) => JSON.parse(res.response))
      .then(data => {
        store.set('chats', data)
      })
      .catch((err: Error) => console.error(err))
  }

  public async createChat(data: Record<string, any>) {
    await ChatAPI.createChat(data)
      .then((res: any) => {
        if (res.status === 200) {
          this.requestChats()
          document.querySelector('.modal')?.remove()
        } else {
          const error = JSON.parse(res.response)
          throw Error(error.error)
        }
      })
      .catch((err: Error) => {
        console.error(err)
      })
  }

  public async deleteChat(chatId: number) {
    if (chatId) {
      await ChatAPI.deleteChat(chatId)
        .then((res: any) => {
          document.querySelector('.modal')?.remove()

          if (res.status === 200) {
            this.requestChats()
          } else {
            throw Error(res.response)
          }
        })
        .catch(err => {
          console.error(`Причина: ${err}`)
        })
    }
  }

  public async addUser(user: number, chat: number) {
    await ChatAPI.addUser(user, chat)
      .then((res: any) => {
        if (res.status === 200) {
          document.querySelector('.modal')?.remove()
        } else {
          throw Error(res.response)
        }
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }

  public async deleteUser(user: number, chatId: number) {
    await ChatAPI.deleteUser(user, chatId)
      .then((res: any) => {
        if (res.status === 200) {
          document.querySelector('.modal')?.remove()
        }
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }

  public async connectToChat(id: number) {
    const userId = await ChatAPI.getChatUsers(id)
      .then((res: any) => JSON.parse(res.response))
      .then((data: any) =>
        data.find((user: any) => user.id === store.getState().user.id)
      )
      .then(user => user.id)
      .catch(err => {
        console.error(err)
      })

    const token = await ChatAPI.getChatToken(id)
      .then((res: any) => JSON.parse(res.response))
      .then(data => data.token)
      .catch(err => {
        console.log(err)
      })

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
