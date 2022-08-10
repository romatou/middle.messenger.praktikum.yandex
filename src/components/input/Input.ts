import template from './template.hbs'
import Block from '../../core/Block'
import './Input.scss'

type InputProps = {
  name: string
  label?: string
  placeholder?: string
  inputType: string
  events?: {
    focus: (e: Event) => void
    blur: (e: Event) => void
  }
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      name: this.props.name,
      placeholder: this.props.placeholder,
      inputType: this.props.type,
    })
  }
}
