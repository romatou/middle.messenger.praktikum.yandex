import Register from './Register'
import Form from '../../components/form/Form'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Link from '../../components/link/Link'
import { validateInput } from '../../utils/validate'
import AuthController from '../../controllers/AuthController'
import { formatFormData } from '../../utils/helpers'

const register = new Register({
  title: 'Войти',
  form: new Form({
    fields: [
      new Input({
        name: 'email',
        label: 'Почтовый адрес',
        type: 'email',
        placeholder: 'Введите адрес электронной почты',
      }),
      new Input({
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        placeholder: 'Введите имя',
      }),
      new Input({
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        placeholder: 'Введите фамилию',
      }),
      new Input({
        name: 'login',
        label: 'Логин',
        type: 'text',
        placeholder: 'Введите логин',
      }),
      new Input({
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        placeholder: 'Введите номер мобильного телефона',
      }),
      new Input({
        name: 'password',
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
      }),
    ],
    events: {
      focus: e => {
        validateInput(e)
      },
      blur: e => {
        validateInput(e)
      },
      submit: async (e: Event) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        AuthController.create(formatFormData(formData))
      },
    },
    button: new Button({
      label: 'Зарегистрироваться',
      type: 'submit',
    }),
  }),
  link: new Link({
    text: 'Есть аккаунт? Войти',
    to: '/',
  }),
})

export default register
