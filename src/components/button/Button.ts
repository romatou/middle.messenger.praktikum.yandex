import Block from '../../core/Block'
import template from './template.hbs'
import './Button.scss'

type ButtonProps = {
  label: string
  inputType: string
  events?: {
    click?: (e: Event) => void
    submit?: (e: Event) => void
  }
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      inputType: this.props.type,
    })
  }
}
