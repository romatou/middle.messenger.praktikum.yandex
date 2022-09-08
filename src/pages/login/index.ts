import Login from './Login'
import Button from '../../components/button/Button'
import Link from '../../components/link/Link'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import AuthController from '../../controllers/AuthController'
import { validateInput } from '../../utils/validate'

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
        AuthController.request(queryData)
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
