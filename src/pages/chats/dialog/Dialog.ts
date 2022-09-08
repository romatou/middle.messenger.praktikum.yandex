import Block from '../../../modules/Block'
import template from './template.hbs'
import './Dialog.scss'
import ChatController from '../../../controllers/ChatController'
import { IIcon } from '../../../components/icon/Icon'
import store, { StoreEvents } from '../../../modules/Store'
import connect from '../../../modules/connect'

interface DialogProps {
  title: string
  id: number
  menu: IIcon
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
