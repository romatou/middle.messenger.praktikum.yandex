import Block from '../../core/Block'
import template from './template.hbs'
import './Button.scss'

interface IButton {
  label: string
  inputType: string
  events?: {
    click?: (e: Event) => void
    submit?: (e: Event) => void
  }
}

export default class Button extends Block<IButton> {
  constructor (props: IButton) {
    super('div', props)
  }

  render (): HTMLElement {
    return this.compile(template, {
      label: this.props.label,
      inputType: this.props.type
    })
  }
}
