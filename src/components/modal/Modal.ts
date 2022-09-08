import Block from '../../modules/Block'
import template from './template.hbs'
import './Modal.css'

interface IModal {
  content: any
}

export default class Modal extends Block<IModal> {
  constructor(props: IModal) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      content: this.props.content,
    })
  }
}
