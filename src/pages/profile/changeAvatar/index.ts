import ChangeAvatar from './ChangeAvatar'
import Form from '../../../components/form/Form'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import { validateInput } from '../../../utils/validate'
import UserController from '../../../controllers/UserController'
import store, { StoreEvents } from '../../../modules/Store'

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
      /* focus: (e: Event) => {
        validateInput(e)
      },
      blur: (e: Event) => {
        validateInput(e)
      }, */
      submit: (e: Event) => {
        e.preventDefault()
        const form = new FormData(e.target)
        /* const queryData = {}
        formData.forEach((value, key) => (queryData[key] = value)) */
        //formData.append('avatar', avatar)
        UserController.updateAvatar(form)
      },
    },
  }),
})

export default changeAvatar
