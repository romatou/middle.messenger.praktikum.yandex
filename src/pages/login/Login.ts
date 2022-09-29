import Block from '../../modules/Block'
import template from './template.hbs'
import { ILink } from '../../components/link/Link'
import AuthController from '../../controllers/AuthController'

interface LoginProps {
  title: string
  form: object
  link: ILink
}

export default class Login extends Block<LoginProps> {
  constructor(props: LoginProps) {
    super('section', props)
    AuthController.getUser()
  }

  render() {
    return this.compile(template, {
      title: this.props.title,
      form: this.props.form,
      link: this.props.link,
    })
  }
}
