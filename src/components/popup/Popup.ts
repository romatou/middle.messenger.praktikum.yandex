import Block from '../../modules/Block'
import template from './template.hbs'
import './Popup.scss'

interface IPopup {
  content: any
}

export default class Popup extends Block<IPopup> {
  constructor(props: IModal) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      content: this.props.content,
    })
  }
}
