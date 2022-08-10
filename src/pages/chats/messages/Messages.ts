import Block from '../../../core/Block'
import template from './template.hbs'
import './Messages.scss'

type PageProps = {
  search: object
  messages: object
  events: {
    submit?: (e: Event) => void
    click?: (e: Event) => void
  }
}

export default class Messages extends Block<PageProps> {
  constructor(props: PageProps) {
    super('section', props)
  }

  render() {
    return this.compile(template, {
      search: this.props.search,
      messages: this.props.messages,
      form: this.props.form,
    })
  }
}
