import template from './template.hbs'
import Block from '../../modules/Block'
import './Input.scss'

export interface IInput {
  name: string
  label?: string
  placeholder?: string
  value?: string | number
  type: string
  accept?: string
  disabled?: string
  events?: {
    focus: (e: Event) => void
    blur: (e: Event) => void
  }
}

export default class Input extends Block {
  constructor(props: IInput) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      name: this.props.name,
      placeholder: this.props.placeholder,
      value: this.props.value,
      accept: this.props.accept,
      type: this.props.type,
      disabled: this.props.disabled,
    })
  }
}
