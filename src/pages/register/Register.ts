import './style.scss'
import Block from '../../modules/Block'
import template from './template.hbs'

interface IPage {
  title: string
  form: object
  link: string
  events?: {
    click?: (e: Event) => void
    submit?: (e: Event) => void
  }
}

export default class Register extends Block<IPage> {
  constructor(props: IPage) {
    super('section', props)
  }

  render() {
    return this.compile(template, {
      title: this.props.title,
      form: this.props.form,
      link: this.props.link,
    })
  }
}
