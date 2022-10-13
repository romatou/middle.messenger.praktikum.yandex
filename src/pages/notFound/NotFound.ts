import Block from '../../modules/Block'
import template from './template.hbs'
import './style.scss'

interface PageProps {
  title: string
  link: any
}

export default class NotFound extends Block {
  constructor(props: PageProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, {
      title: this.props.title,
      link: this.props.link,
    })
  }
}
