import ChangePass from './ChangePass'
import Form from '../../../components/form/Form'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import { validateInput } from '../../../utils/validate'
import UserController from '../../../controllers/UserController'
import store, { StoreEvents } from '../../../modules/Store'

const changePass = new ChangePass({
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
        const formData = new FormData(e.target)
        const queryData = {}
        formData.forEach((value, key) => (queryData[key] = value))
        UserController.updatePassword(queryData)
      },
    },
  }),
})

export default changePass
