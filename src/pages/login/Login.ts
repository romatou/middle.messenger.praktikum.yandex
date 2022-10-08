import Block from '../../modules/Block'
import template from './template.hbs'
import Link from '../../components/link/Link'
import Form from '../../components/form/Form'
import AuthController from '../../controllers/AuthController'

interface LoginProps {
  title: string
  form: Form
  link: Link
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
