import Block from '../../modules/Block'
import template from './template.hbs'
import connect from '../../modules/connect'
import AuthController from '../../controllers/AuthController'
import store, { StoreEvents } from '../../modules/Store'

interface IUser {
  logout: unknown
  link: unknown
  changeData: any
  avatar: any
  form: object
  events: {
    submit?: (e: any) => void
  }
}

class Profile extends Block<IUser> {
  constructor(props: IUser) {
    super('section', props)
    AuthController.getUser()

    store.on(StoreEvents.Updated, () => {
      props.avatar.setProps({
        image: `https://ya-praktikum.tech/api/v2/resources${store.getState().user.avatar
        }`,
      })

      this.props.data = store.getState().user
    })
  }

  render() {
    return this.compile(template, {
      link: this.props.link,
      avatar: this.props.avatar,
      user: this.props.user,
    })
  }
}

const withProfile = connect(state => ({ user: state.user }))

export default withProfile(Profile)
