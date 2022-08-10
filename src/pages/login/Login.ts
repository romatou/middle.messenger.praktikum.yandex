import Block from '../../core/Block'
import template from './template.hbs'

type LoginProps = {
  title: string
  form: object
  link: string
}

export default class Login extends Block<LoginProps> {
  constructor(props: LoginProps) {
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
