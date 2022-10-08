import Block from '../../../modules/Block'
import template from './template.hbs'
import IForm from '../../../components/form/Form'
import connect from '../../../modules/connect'
import store, { StoreEvents } from '../../../modules/Store'

interface IChangeData {
  form: IForm
}

class ChangeData extends Block<IChangeData> {
  constructor(props: IChangeData) {
    super('section', props)

    store.on(StoreEvents.Updated, () => {
      props.form.children.fields.forEach((el: any) => {
        if (el.props.name === 'login') {
          el.setProps({
            value: store.getState().user.login,
          })
        } else if (el.props.name === 'email') {
          el.setProps({
            value: store.getState().user.email,
          })
        } else if (el.props.name === 'phone') {
          el.setProps({
            value: store.getState().user.phone,
          })
        } else if (el.props.name === 'first_name') {
          el.setProps({
            value: store.getState().user.first_name,
          })
        } else if (el.props.name === 'second_name') {
          el.setProps({
            value: store.getState().user.second_name,
          })
        }
      })
    })
  }

  render() {
    return this.compile(template, {
      form: this.props.form,
      link: this.props.link,
    })
  }
}

const withChangeData = connect(state => ({ user: state.user }))

export default withChangeData(ChangeData)
