import Block from '../../../modules/Block'
import template from './template.hbs'

interface IChangePass {
  link: any
  form: any
}

export default class ChangePass extends Block<IChangePass> {
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
