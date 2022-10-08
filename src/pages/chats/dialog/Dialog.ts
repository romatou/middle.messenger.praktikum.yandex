import Block from '../../../modules/Block'
import template from './template.hbs'
import './Dialog.scss'
import ChatController from '../../../controllers/ChatController'
import { IIcon } from '../../../components/icon/Icon'
import store, { StoreEvents } from '../../../modules/Store'
import connect from '../../../modules/connect'

export interface DialogProps {
  id: number
  title: string
  menu: IIcon[]
  avatar: object
  messages: object
  form: object
  events: {
    submit?: (e: Event) => void
  }
}

class Dialog extends Block<DialogProps> {
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
    const messages: HTMLElement | null =
      document.querySelector('.dialog__messages')

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
