import Block from '../../modules/Block'
import template from './template.hbs'
import store, { StoreEvents } from '../../modules/Store'
import Router from '../../modules/Router'
import AuthController from '../../controllers/AuthController'

interface LoginProps {
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
