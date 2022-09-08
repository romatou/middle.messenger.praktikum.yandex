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
      .then(res => {
        if (res.length !== 0) {
          return JSON.parse(res.response)
        }
      })
      .then(data => {
        store.set('chats', data)
      })
  }

  public async createChat(data) {
    await ChatAPI.createChat(JSON.stringify(data))
      .then(res => {
        if (res.status === 200) {
          this.requestChats()
          document.querySelector('.modal')?.remove()
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  public async deleteChat(chatId) {
    await ChatAPI.deleteChat(JSON.stringify(chatId))
      .then(res => {
        if (res.status === 200) {
          document.querySelector('.modal')?.remove()
          this.requestChats()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  public async addUser(user, chat) {
    await ChatAPI.addUser(user, chat)
      .then(res => {
        if (res.status === 200) {
          document.querySelector('.modal')?.remove()
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
    const user = await ChatAPI.getChatUsers(id)
      .then(res => {
        const users = JSON.parse(res.response)

        // Необходимо удалить себя из объекта и оставить только ID собеседника
        users.forEach((user, index) => {
          if (user.id != store.getState().user.id) {
            users.splice(index, 1)
          }
        })
        return users
      })
      .then(data => {
        return data[0].id
      })
      .catch(err => {
        console.err(err)
      })

    const token = await ChatAPI.getChatToken(id)
      .then(res => JSON.parse(res.response))
      .then(data => data.token)
      .catch(err => {
        console.log(err)
      })

    this._socket = new Socket(user, id, token)
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
