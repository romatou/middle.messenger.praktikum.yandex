import Block from '../../core/Block'
import template from './template.hbs'
import './style.scss'

interface PageProps {
  title: string
  link: string
  linkText: string
}

export default class PageNotFound extends Block<PageProps> {
  constructor (props: PageProps) {
    super('div', props)
  }

  render () {
    return this.compile(template, {
      title: this.props.title,
      linkText: this.props.linkText
    })
  }
}
