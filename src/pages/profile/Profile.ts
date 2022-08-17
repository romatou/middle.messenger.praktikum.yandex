import Block from '../../core/Block'
import template from './template.hbs'

interface PageProps {
  link: string
  avatar: object
  form: object
  events: {
    submit?: (e: Event) => void
  }
}
export default class Profile extends Block<PageProps> {
  constructor (props: PageProps) {
    super('section', props)
  }

  render (): HTMLElement {
    return this.compile(template, {
      link: this.props.link,
      avatar: this.props.avatar,
      form: this.props.form
    })
  }
}
