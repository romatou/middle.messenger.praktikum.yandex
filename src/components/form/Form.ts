import Block from '../../modules/Block'
import template from './template.hbs'
import IInput from '../input/Input'
import IButton from '../button/Button'

export type IForm = {
  fields: IInput[]
  button: IButton
  events: {
    focus?: (e: Event) => void
    blur?: (e: Event) => void
    submit: (e: Event) => void
  }
}

export default class Form extends Block {
  constructor(props: IForm) {
    super('div', props)
  }

  addEvents(): void {
    const { events = {} } = this.props
    const inputs: NodeListOf<HTMLInputElement> | undefined =
      this.element?.querySelectorAll<HTMLInputElement>('input')
    inputs?.forEach((item: HTMLInputElement) => {
      Object.keys(events).forEach(eventName => {
        item.addEventListener(eventName, events[eventName])
      })
    })

    Object.keys(events).forEach(eventName => {
      this.element?.addEventListener(eventName, events[eventName])
    })
  }

  removeEvents() {
    const { events = {} } = this.props
    const inputs = this.element?.querySelectorAll('input')

    inputs?.forEach(item => {
      Object.keys(events).forEach(eventName => {
        item.removeEventListener(eventName, events[eventName])
      })
    })

    Object.keys(events).forEach(eventName => {
      this.element?.addEventListener(eventName, events[eventName])
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
