import template from './template.hbs'
import Block from '../../core/Block'
import './Input.scss'

interface IInput {
  name: string
  label?: string
  placeholder?: string
  inputType: string
  events?: {
    focus: (e: Event) => void
    blur: (e: Event) => void
  }
}

export default class Input extends Block<IInput> {
  constructor (props: IInput) {
    super('div', props)
  }

  render (): HTMLElement {
    return this.compile(template, {
      label: this.props.label,
      name: this.props.name,
      placeholder: this.props.placeholder,
      inputType: this.props.type
    })
  }
}
