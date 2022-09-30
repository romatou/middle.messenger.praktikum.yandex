import { BASE_WEBSOCKET } from '../consts/BASE_URL'
import store from '../modules/Store'

export default class Socket {
  private _socket: Socket | null

  constructor(user: number, id: number, token: string) {
    this._socket = new WebSocket(`${BASE_WEBSOCKET}/${user}/${id}/${token}`)
    this._timeout = 0

    this._socket.addEventListener('open', () => {
      clearInterval(this._timeout)
      this.ping()
      this.getMessages()
    })

    this._socket.addEventListener('message', event => {
      const data = JSON.parse(event.data)

      if (
        data.type !== 'pong' &&
        data.type !== 'user connected' &&
        data.type !== 'user error'
      ) {
        if (Array.isArray(data)) {
          data.forEach(message => {
            if (message.user_id === store.getState().user.id) {
              message.class = 'mine'
            }
          })
          store.set('messages', data)
        } else {
          if (data.user_id === store.getState().user.id) {
            data.class = 'mine'
          }

          store.set('messages', [data, ...store.getState().messages])
        }
      }
    })

    this._socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение WebSocket закрыто пользователем')
      } else {
        console.log('Обрыв соединения')
      }

      console.log(`Код: ${event.code} | Причина: ${event}`)
    })

    this._socket.addEventListener('error', event => {
      console.log('Ошибка', event.message)
    })
  }

  ping(): void {
    this._timeout = setInterval(() => {
      this._socket.send(
        JSON.stringify({
          type: 'ping',
        })
      )
    }, 10000)
  }

  sendMessage(message: string): void {
    return this._socket.send(
      JSON.stringify({
        content: message.message,
        type: 'message',
      })
    )
  }

  getMessages() {
    return this._socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    )
  }
}
