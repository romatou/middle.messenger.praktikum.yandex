import Block from '../../modules/Block'
import template from './template.hbs'
import Router from '../../modules/Router'
import connect from '../../modules/connect'
import AuthController from '../../controllers/AuthController'
import store, { StoreEvents } from '../../modules/Store'

interface IUser {
  logout: unknown
  link: unknown
  changeData: HTMLLinkElement
  avatar: HTMLImageElement
  form: object
  events: {
    submit?: (e: Event) => void
  }
}

class Profile extends Block<IUser> {
  constructor(props: IUser) {
    super('section', props)

    AuthController.getUser()

    store.on(StoreEvents.Updated, () => {
      this.props.data = store.getState().user

      props.avatar.setProps({
        image: `https://ya-praktikum.tech/api/v2/resources${
          store.getState().user.avatar
        }`,
      })
    })
  }

  render() {
    return this.compile(template, {
      link: this.props.link,
      avatar: this.props.avatar,
      data: this.props.data,
      changeData: this.props.changeData,
    })
  }
}

export default Profile
