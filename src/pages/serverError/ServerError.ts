import Block from '../../modules/Block'
import template from './template.hbs'

interface PageProps {
  title: string
  paragraph: string
  link: string
  className: string
}

export default class ServerError extends Block {
  constructor(props: PageProps) {
    super('section', props)
  }

  render() {
    return this.compile(template, {
      title: this.props.title,
      paragraph: this.props.paragraph,
      link: this.props.link,
      className: this.props.className,
    })
  }
}
