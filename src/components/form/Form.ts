import Block from '../../core/Block'
import template from './template.hbs'

interface FormProps {
  fields: HTMLElement[]
  button: HTMLElement
  events?: {
    focus?: (e: Event) => void
    blur?: (e: Event) => void
    submit?: (e: Event) => void
  }
}

export default class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super('div', props)
  }

  addEvents() {
    const { events = {} } = this.props
    const inputs = this.element!.querySelectorAll('input')

    inputs.forEach(item => {
      Object.keys(events).forEach(eventName => {
        item.addEventListener(eventName, events[eventName])
      })
    })
  }

  removeEvents() {
    const { events = {} } = this.props
    const inputs = this.element!.querySelectorAll('input')

    inputs.forEach(item => {
      Object.keys(events).forEach(eventName => {
        item.removeEventListener(eventName, events[eventName])
      })
    })
  }

  render() {
    return this.compile(template, {
      id: this.props.id,
      className: this.props.className,
      button: this.props.button,
      fields: this.props.fields,
    })
  }
}
