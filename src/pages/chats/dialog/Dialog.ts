import Block from '../../../core/Block'
import template from './template.hbs'
import './Dialog.scss'

interface PageProps {
  avatar: object
  messages: object
  form: object
  events: {
    submit?: (e: Event) => void
  }
}

export default class Dialog extends Block<PageProps> {
  constructor (props: PageProps) {
    super('section', props)
  }

  render () {
    return this.compile(template, {
      avatar: this.props.avatar,
      messages: this.props.messages,
      form: this.props.form
    })
  }
}
