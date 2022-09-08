import Block from '../../modules/Block'
import template from './template.hbs'
// import Button from '../../components/button/Button'

interface IChangePass {
  form: any
  events?: {
    submit: (e: Event) => void
  }
}
export default class ChangePass extends Block<IChangePass> {
  constructor(props: IChangePass) {
    super('section', props)
  }

  render() {
    return this.compile(template, {
      form: this.props.form,
    })
  }
}
