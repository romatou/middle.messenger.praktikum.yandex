import Block from '../../../modules/Block'
import template from './template.hbs'
import IForm from '../../../components/form/Form'

interface IChangeData {
  form: IForm
}

class ChangeData extends Block<IChangeData> {
  constructor(props: IChangeData) {
    super('section', props)
  }

  render() {
    return this.compile(template, {
      form: this.props.form,
    })
  }
}

export default ChangeData
