import { BASE_WEBSOCKET } from '../consts/BASE_URL'
import store from '../modules/Store'
import { FormModel } from '../types/FormModel'

export default class Socket {
  private _socket: WebSocket | null

  constructor(user: number, id: number, token: string) {
    this._socket = new WebSocket(`${BASE_WEBSOCKET}/${user}/${id}/${token}`)

    this._socket.addEventListener('open', () => {
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
      console.error('Ошибка', (event as ErrorEvent).message)
    })
  }

  ping(): void {
    setInterval(() => {
      this._socket?.send(
        JSON.stringify({
          type: 'ping',
        })
      )
    }, 10000)
  }

  sendMessage(text: FormModel) {
    return this._socket?.send(
      JSON.stringify({
        content: text.message,
        type: 'message',
      })
    )
  }

  getMessages() {
    return this._socket?.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    )
  }
}
