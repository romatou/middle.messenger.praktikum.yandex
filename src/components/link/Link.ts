import Block from '../../modules/Block'
import template from './link.hbs'
import Router from '../../modules/Router'

export interface ILink {
  text: string
  to: string
  page?: typeof Block
  events?: {
    click?: () => void
  }
}

export default class Link extends Block {
  constructor(props: ILink) {
    super('div', {
      text: props.text,
      to: props.to,
      events: {
        click: () => {
          Router.go(props.to)
        },
      },
    })
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      to: this.props.to,
    })
  }
}
