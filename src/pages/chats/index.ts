import Chats from './Chats'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Form from '../../components/form/Form'
import Link from '../../components/link/Link'
import Modal from '../../components/modal/Modal'
import ChatController from '../../controllers/ChatController'

const chats = new Chats({
  chats: [],
  search: new Input({
    name: 'search',
    label: 'Поиск',
    type: 'text',
    placeholder: 'поиск чата',
  }),
  profileLink: new Link({
    text: 'Профиль',
    to: '/settings',
  }),
  addChat: new Button({
    label: 'Добавить чат',
    type: 'button',
    events: {
      click: () => {
        const addChatModal = new Modal({
          content: new Form({
            fields: [
              new Input({
                name: 'title',
                type: 'text',
              }),
            ],
            button: new Button({
              label: 'Добавить чат',
              type: 'submit',
            }),
            events: {
              submit: e => {
                e.preventDefault()
                const data: unknown = e.target
                const formData = new FormData(data as HTMLFormElement)
                const queryData: Record<string, any> = {}
                formData.forEach((value, key) => {
                  queryData[key] = value
                })
                ChatController.createChat(queryData)
              },
            },
          }),
        })

        const root = document.querySelector('.app')
        root?.appendChild((addChatModal as any).getContent())
      },
    },
  }),
})

export default chats
