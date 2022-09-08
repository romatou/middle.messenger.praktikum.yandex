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
      const messages = JSON.parse(event.data)
      store.set('messages', messages)
    })

    /* socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение WebSocket закрыто пользователем')
      } else {
        console.log('Обрыв соединения')
      }

      console.log(`Код: ${event.code} | Причина: ${event}`)
    })



    socket.addEventListener('error', event => {
      console.log('Ошибка', event.message)
    }) */
  }

  ping(): void {
    this._timeout = setInterval(() => {
      this._socket.send(
        JSON.stringify({
          type: 'ping',
        })
      )
    }, 20000)
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
