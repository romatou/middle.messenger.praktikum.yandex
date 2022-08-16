import Block from '../../core/Block'
import template from './link.hbs'
import './Link.css'

interface LinkProps {
  url?: string
  text: string
  events?: {
    click: (e: Event) => void
  }
}

export default class Link extends Block<LinkProps> {
  render () {
    return this.compile(template, {
      url: this.props.url,
      text: this.props.text
    })
  }
}
