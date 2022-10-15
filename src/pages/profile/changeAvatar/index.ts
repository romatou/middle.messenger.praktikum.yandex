import ChangeAvatar from './ChangeAvatar'
import Form from '../../../components/form/Form'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import UserController from '../../../controllers/UserController'
import Link from '../../../components/link/Link'

const changeAvatar = new ChangeAvatar({
  link: new Link({
    text: 'Назад в профиль',
    to: '/settings',
  }),
  form: new Form({
    fields: [
      new Input({
        name: 'avatar',
        type: 'file',
        accept: 'image/*',
      }),
    ],
    button: new Button({
      label: 'Изменить аватар профиля',
      type: 'submit',
    }),
    events: {
      submit: e => {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        UserController.updateAvatar(form)
      },
    },
  }),
})

export default changeAvatar
