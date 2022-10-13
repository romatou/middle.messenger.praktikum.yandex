import ChangePass from './ChangePass'
import Form from '../../../components/form/Form'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import { validateInput } from '../../../utils/validate'
import UserController from '../../../controllers/UserController'
import { formatFormData } from '../../../utils/helpers'
import Link from '../../../components/link/Link'

const changePass = new ChangePass({
  link: new Link({
    text: 'Назад в профиль',
    to: '/settings',
  }),
  form: new Form({
    fields: [
      new Input({
        name: 'oldPassword',
        label: 'Старый пароль',
        type: 'password',
      }),
      new Input({
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'text',
      }),
    ],
    button: new Button({
      label: 'Изменить пароль',
      type: 'submit',
    }),
    events: {
      focus: (e: Event) => {
        validateInput(e)
      },
      blur: (e: Event) => {
        validateInput(e)
      },
      submit: (e: Event) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        UserController.updatePassword(formatFormData(formData))
      },
    },
  }),
})

export default changePass
