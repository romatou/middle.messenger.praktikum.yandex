import Block from '../../core/Block'
import template from './template.hbs'
import Button from '../../components/button/Button'
import data from '../../data/profileData.json'

type PageProps = {
  avatar: object
  form: object
  events?: {
    submit: (e: Event) => void
  }
}
export default class ChangePass extends Block<PageProps> {
  constructor(props: PageProps) {
    super('section', props)
  }

  render() {
    return this.compile(template, {
      avatar: this.props.avatar,
      form: this.props.form,
    })
  }
}
