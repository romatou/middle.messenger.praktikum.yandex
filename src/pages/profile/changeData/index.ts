import ChangeData from './ChangeData'
import Form from '../../../components/form/Form'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import { validateInput } from '../../../utils/validate'
import UserController from '../../../controllers/UserController'

import Link from '../../../components/link/Link'

const changeData = new ChangeData({
  link: new Link({
    text: 'Назад в профиль',
    to: '/settings',
  }),
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
      focus: (e: Event): void => {
        validateInput(e)
      },
      blur: (e: Event): void => {
        validateInput(e)
      },
      submit: (e): void => {
        e.preventDefault()
        const data: unknown = e.target
        const formData = new FormData(data as HTMLFormElement)
        const queryData: Record<string, any> = {}
        formData.forEach((value, key) => (queryData[key] = value))
        UserController.update(queryData)
      },
    },
  }),
})

export default changeData
