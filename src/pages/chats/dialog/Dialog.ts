import Block from '../../../modules/Block'
import Form from '../../../components/form/Form'
import template from './template.hbs'
import './Dialog.scss'
import ChatController from '../../../controllers/ChatController'
import store, { StoreEvents } from '../../../modules/Store'
import connect from '../../../modules/connect'
import { ChatMenu } from '../../../types/Types'

export interface DialogProps {
  id: number
  title: string
  menu: ChatMenu
  messages?: HTMLElement
  form: Form
  events?: {
    submit?: (e: Event) => void
  }
}

class Dialog extends Block {
  constructor(props: DialogProps) {
    super('section', props)
    ChatController.connectToChat(props.id)

    store.on(StoreEvents.Updated, () => {
      props.messages = store.getState().messages
    })
  }

  protected addEvents(): void {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this.element?.addEventListener(eventName, events[eventName])
    })

    const dialogWindow = document.querySelector('.dialog__main')
    const messages = document.querySelector('.dialog__messages')

    if (dialogWindow) {
      dialogWindow.scroll(0, (messages as HTMLElement).scrollHeight)
    }
  }

  render() {
    return this.compile(template, {
      title: this.props.title,
      id: this.props.id,
      menu: this.props.menu,
      messages: this.props.messages,
      form: this.props.form,
    })
  }
}

const withDialog = connect(state => ({ messages: state.messages }))

export default withDialog(Dialog)
