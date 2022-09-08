import Block from '../../modules/Block'
import template from './template.hbs'
import './Chat.scss'

interface IChat {
  title: string
  message: string
  unread_count: number
  time: string
  events?: {
    click: (e: Event) => void
  }
}

export default class Chat extends Block<IChat> {
  constructor(props: IChat) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      title: this.props.title,
      message: this.props.message,
      unread_count: this.props.unread_count,
      time: this.props.time,
    })
  }
}
