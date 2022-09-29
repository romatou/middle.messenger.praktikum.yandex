import Block from '../../modules/Block'
import template from './template.hbs'
import store, { StoreEvents } from '../../modules/Store'
import ChatController from '../../controllers/ChatController'
import './Chats.scss'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Modal from '../../components/modal/Modal'
import Dialog from './dialog/Dialog'
import renderDOM from '../../modules/renderDOM'
import Icon from '../../components/icon/Icon'
import addUserImage from '/static/icons/add_user.png'
import deleteUserImage from '/static/icons/delete_user.png'
import deleteChatImage from '/static/icons/delete_chat.png'
import connect from '../../modules/connect'

interface IChat {
  search: object
  chats?: object
  link?: any
  events: {
    submit?: (e: Event) => void
    click?: (e: Event) => void
  }
}

class Chats extends Block<IChat> {
  constructor(props: IChat) {
    super('section', props)
    ChatController.requestChats()

    store.on(StoreEvents.Updated, () => {
      props.chats = store.getState().chats
    })
  }

  protected addEvents(): void {
    const chats = this.props.chats

    if (chats) {
      chats.forEach(el => {
        const item = document.getElementById(el.id)
        item?.addEventListener('click', () => {
          const activeChat = document.querySelector('.active')

          if (activeChat) {
            activeChat.classList.remove('active')
          }

          item.classList.add('active')

          this.openDialog(el)
        })
      })
    }
  }

  openDialog(chat) {
    const dialog = new Dialog({
      title: `${chat.title} (ID чата: ${chat.id})`,
      id: chat.id,
      menu: [
        new Icon({
          className: 'add_user',
          image: addUserImage,
          events: {
            click: e => {
              const modal = new Modal({
                content: new Form({
                  fields: [
                    new Input({
                      label: 'Логин пользователя',
                      name: 'users',
                      type: 'number',
                    }),
                  ],
                  button: new Button({
                    label: 'Добавить пользователя',
                    type: 'submit',
                  }),
                  events: {
                    submit: e => {
                      e.preventDefault()
                      let userId = null
                      const formData = new FormData(e.target)
                      formData.forEach(val => {
                        userId = parseInt(val)
                      })
                      ChatController.addUser(userId, chat.id)
                    },
                  },
                }),
              })

              const root = document.querySelector('.app')
              root.appendChild(modal.getContent())
            },
          },
        }),
        new Icon({
          className: 'delete_user',
          image: deleteUserImage,
          events: {
            click: (e: Event) => {
              const modal = new Modal({
                content: new Form({
                  fields: [
                    new Input({
                      name: 'users',
                      type: 'number',
                    }),
                  ],
                  button: new Button({
                    label: 'Удалить пользователя из чата',
                    type: 'submit',
                  }),
                  events: {
                    submit: e => {
                      e.preventDefault()
                      let users = null
                      const formData = new FormData(e.target)
                      formData.forEach(val => {
                        users = parseInt(val)
                      })
                      ChatController.deleteUser(users, chat.id)
                    },
                  },
                }),
              })
              const root = document.querySelector('.app')
              root.appendChild(modal.getContent())
            },
          },
        }),
        new Icon({
          className: 'delete_chat',
          image: deleteChatImage,
          events: {
            click: e => {
              const modal = new Modal({
                content: new Form({
                  fields: [
                    new Input({
                      label: 'ID чата',
                      name: 'chatId',
                      type: 'number',
                    }),
                  ],
                  button: new Button({
                    label: 'Удалить чат',
                    type: 'submit',
                  }),
                  events: {
                    submit: e => {
                      e.preventDefault()
                      let chatId = null
                      const formData = new FormData(e.target)
                      formData.forEach(val => {
                        chatId = parseInt(val)
                      })
                      ChatController.deleteChat(chatId)
                    },
                  },
                }),
              })
              const root = document.querySelector('.app')
              root.appendChild(modal.getContent())
            },
          },
        }),
      ],
      messages: '',
      form: new Form({
        fields: [
          new Input({
            name: 'message',
            type: 'text',
            placeholder: 'Введите сообщение',
          }),
        ],
        button: new Button({
          type: 'submit',
          label: 'Отправить',
        }),
      }),
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          const formData = new FormData(e.target)
          const queryData = {}
          formData.forEach((value, key) => (queryData[key] = value))
          ChatController.sendMessage(queryData)
        },
      },
    })

    renderDOM('.chat__dialog', dialog)
  }

  render() {
    return this.compile(template, {
      search: this.props.search,
      chats: this.props.chats,
      link: this.props.link,
      form: this.props.form,
    })
  }
}

const withChats = connect(state => ({
  chats: state.chats,
}))

export default withChats(Chats)
