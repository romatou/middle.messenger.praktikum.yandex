import Profile from './Profile'
import Button from '../../components/button/Button'
import Link from '../../components/link/Link'
import Avatar from '../../components/avatar/Avatar'
import './profile.scss'
import AuthController from '../../controllers/AuthController'
import ProfileDummy from '../../assets/images/user.png'

const profile = new Profile({
  logout: new Button({
    label: 'Выйти',
    type: 'submit',
    events: {
      click: () => {
        AuthController.delete()
      },
    },
  }),
  dataChange: new Link({
    text: 'Изменить данные',
    to: '/settings/change-data',
  }),
  passChange: new Link({
    text: 'Изменить пароль',
    to: '/settings/change-password',
  }),
  avatarChange: new Link({
    text: 'Изменить аватар',
    to: '/settings/change-avatar',
  }),
  link: new Link({
    text: 'Назад к чатам',
    to: '/messenger',
  }),
  avatar: new Avatar({
    image: ProfileDummy,
    name: 'Аватар пользователя',
  }),
  button: new Button({
    label: 'Сохранить',
    type: 'submit',
  }),
})

export default profile
