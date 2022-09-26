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
      .then(res => JSON.parse(res.response))
      .then(data => store.set('chats', data))
      .catch(err => console.error(err))
  }

  public async createChat(data: any) {
    await ChatAPI.createChat(data)
      .then(res => {
        if (res.status === 200) {
          this.requestChats()
          document.querySelector('.modal')?.remove()
        } else {
          const error = JSON.parse(res.response)
          throw Error(error.error)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  public async deleteChat(chatId) {
    if (chatId) {
      await ChatAPI.deleteChat(chatId)
        .then(res => {
          document.querySelector('.modal')?.remove()

          if (res.status === 200) {
            this.requestChats()
          } else {
            throw Error
          }
        })
        .catch(err => {
          console.error(`Причина: ${err}`)
        })
    }
  }

  public async addUser(user, chat) {
    await ChatAPI.addUser(user, chat)
      .then(res => {
        if (res.status === 200) {
          document.querySelector('.modal')?.remove()
        } else {
          throw Error(res.response)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  public async deleteUser(user, chatId) {
    await ChatAPI.deleteUser(user, chatId)
      .then(res => {
        if (res.status === 200) {
          document.querySelector('.modal')?.remove()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  public async connectToChat(id) {
    const userId = await ChatAPI.getChatUsers(id)
      .then(res => JSON.parse(res.response))
      .then(data => data.find(user => user.id === store.getState().user.id))
      .then(user => user.id)
      .catch(err => {
        console.err(err)
      })

    const token = await ChatAPI.getChatToken(id)
      .then(res => JSON.parse(res.response))
      .then(data => data.token)
      .catch(err => {
        console.log(err)
      })

    this._socket = new Socket(userId, id, token)
  }

  public sendMessage(message) {
    const isValid = validateSubmit(message)

    if (isValid) {
      this._socket.sendMessage(message)
      this._socket.getMessages()
    }
  }
}

export default new ChatController()
