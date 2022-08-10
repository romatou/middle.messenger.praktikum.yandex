import './style.scss'
import Block from '../../core/Block'
import template from './template.hbs'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'

type PageProps = {
  title: string
  form: object
  link: string
  events?: {
    click?: (e: Event) => void
    submit?: (e: Event) => void
  }
}

export default class Register extends Block<PageProps> {
  constructor(props: PageProps) {
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
