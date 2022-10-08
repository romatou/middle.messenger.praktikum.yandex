import template from './template.hbs'
import Block from '../../modules/Block'
import './Icon.scss'

export interface IIcon {
  image: string
  className: string
  title?: string
  events?: {
    click: (e: Event) => void
  }
}

export default class Icon extends Block<IIcon> {
  constructor(props: IIcon) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      image: this.props.image,
      className: this.props.className,
      title: this.props.title,
    })
  }
}
