import Messages from './messages/Messages'
import Dialog from './dialog/Dialog'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Avatar from '../../components/avatar/Avatar'
import Form from '../../components/form/Form'
import data from '../../data/usersList.json'
import messageData from '../../data/chat.json'
import renderDOM from '../../core/renderDOM'
import {inputValidator, submitValidator} from '../../utils/validation'

export const pageChats = new Messages({
  search: new Input({
    name: 'search',
    label: 'Поиск',
    inputType: 'text',
    placeholder: 'поиск чата',
  }),
  messages: data.messages,
  events: {
    click: (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A') {
        ;(target.parentElement as HTMLElement)
          .querySelectorAll('.active')
          .forEach((e) => e.classList.remove('active'))
        target.classList.add('active')
        renderDOM('.chat__dialog', pageActiveChat)
      }
      if (target.tagName === 'INPUT') {
        inputValidator(e)
      }
      if (target.tagName === 'BUTTON') {
        submitValidator(e)
      }
    },
  },
})

export const pageActiveChat = new Dialog({
  messages: messageData,
  avatar: new Avatar({
    image: `https://api.time.com/wp-content/uploads/2017/12/
      terry-crews-person-of-year-2017-time-magazine-2.jpg`,
    name: 'user-logo',
  }),
  form: new Form({
    fields: [
      new Input({
        name: 'message',
        inputType: 'text',
      }),
    ],
    button: new Button({
      inputType: 'submit',
      label: 'Отправить',
    }),
  }),
  events: {
    submit: (e: Event) => {
      e.preventDefault()
      const fields = document.querySelector('textarea')
      const data = {}
      data.message = fields!.value
      console.log(data)
    },
  },
})
