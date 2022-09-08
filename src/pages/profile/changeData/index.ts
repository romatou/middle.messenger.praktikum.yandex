import ChangeData from './ChangeData'
import Form from '../../../components/form/Form'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import { validateInput } from '../../../utils/validate'
import UserController from '../../../controllers/UserController'
import store, { StoreEvents } from '../../../modules/Store'

const changeData = new ChangeData({
  form: new Form({
    fields: [
      new Input({
        name: 'login',
        label: 'Логин',
        type: 'text',
      }),
      new Input({
        name: 'first_name',
        label: 'Имя',
        type: 'text',
      }),
      new Input({
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
      }),
      new Input({
        name: 'email',
        label: 'Email',
        type: 'email',
      }),
      new Input({
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
      }),
      new Input({
        name: 'display_name',
        type: 'hidden',
      }),
    ],
    button: new Button({
      label: 'Сохранить новые данные',
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
        UserController.update(queryData)
      },
    },
  }),
})

export default changeData
