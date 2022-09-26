import ChangeAvatar from './ChangeAvatar'
import Form from '../../../components/form/Form'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import UserController from '../../../controllers/UserController'

const changeAvatar = new ChangeAvatar({
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
      submit: (e: Event) => {
        e.preventDefault()
        const form = new FormData(e.target)
        UserController.updateAvatar(form)
      },
    },
  }),
})

export default changeAvatar
