import Login from './Login'
import Button from '../../components/button/Button'
import Link from '../../components/link/Link'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import AuthController from '../../controllers/AuthController'
import { LoginFormModel } from '../../types/FormModel'

import './style.scss'

const login = new Login({
  title: 'Войти',
  form: new Form({
    fields: [
      new Input({
        name: 'login',
        label: 'Логин',
        type: 'text',
        placeholder: 'Введите логин',
      }),
      new Input({
        name: 'password',
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
      }),
    ],
    events: {
      submit: (e: Event) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const queryData: any = {}
        formData.forEach((value: FormDataEntryValue, key: string): void => {
          queryData[key] = value
        })
        AuthController.request(queryData as LoginFormModel)
      },
    },
    button: new Button({
      label: 'Войти',
      type: 'submit',
    }),
  }),
  link: new Link({
    text: 'Зарегистрироваться',
    to: '/sign-up',
  }),
})

export default login
