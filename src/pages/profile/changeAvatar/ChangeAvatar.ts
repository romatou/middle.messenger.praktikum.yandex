import Block from '../../../modules/Block'
import template from './template.hbs'

interface IChangeAvatar {
  form: any
  link: any
}

export default class ChangeAvatar extends Block {
  constructor(props: IChangeAvatar) {
    super('section', props)
  }

  render() {
    return this.compile(template, {
      form: this.props.form,
      button: this.props.button,
      link: this.props.link,
    })
  }
}
