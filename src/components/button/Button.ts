import Block from '../../modules/Block'
import template from './template.hbs'
import './Button.scss'

export interface IButton {
  label: string
  type: string
  events?: {
    click?: (e: Event) => void
    submit?: (e: Event) => void
  }
}

export default class Button extends Block<IButton> {
  constructor(props: IButton) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      type: this.props.type,
    })
  }
}
