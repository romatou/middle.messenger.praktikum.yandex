import Block from '../../core/Block'
import template from './template.hbs'

interface PageProps {
  title: string
  paragraph: string
  link: string
  className: string
}

export default class ServerError extends Block<PageProps> {
  constructor (props: PageProps) {
    super('section', props)
  }

  render () {
    return template(this.props)
  }
}
