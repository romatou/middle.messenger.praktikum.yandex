import Block from '../../modules/Block'
import Link from '../../components/link/Link'
import Avatar from '../../components/avatar/Avatar'
import Button from '../../components/button/Button'
import template from './template.hbs'
import connect from '../../modules/connect'
import AuthController from '../../controllers/AuthController'
import store, { StoreEvents } from '../../modules/Store'

interface IUser {
  logout: Button
  link: Link
  dataChange: Link
  passChange: Link
  avatarChange: Link
  avatar: Avatar
  button: Button
  events?: {
    submit: (e: Event) => void
  }
}

class Profile extends Block {
  constructor(props: IUser) {
    super('section', props)
    AuthController.getUser()

    store.on(StoreEvents.Updated, () => {
      this.props.user = store.getState().user
      if (store.getState().user.avatar !== null) {
        props.avatar.setProps({
          image: `https://ya-praktikum.tech/api/v2/resources${store.getState().user.avatar
          }`,
        })
      }
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
