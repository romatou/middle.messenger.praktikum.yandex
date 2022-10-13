import Block from '../../../modules/Block'
import template from './template.hbs'
import Form from '../../../components/form/Form'
import Link from '../../../components/link/Link'

interface IChangePass {
  link: Link
  form: Form
}

export default class ChangePass extends Block {
  constructor(props: IChangePass) {
    super('section', props)
  }

  render() {
    return this.compile(template, {
      form: this.props.form,
      button: this.props.button,
      linl: this.props.link,
    })
  }
}
