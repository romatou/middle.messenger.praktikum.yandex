import Login from './Login'
import Button from '../../components/button/Button'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import { inputValidator, submitValidator } from '../../utils/validation'

import './style.scss'

export const pageLogin = new Login({
  title: 'Войти',
  form: new Form({
    fields: [
      new Input({
        name: 'login',
        label: 'Логин',
        inputType: 'text',
        placeholder: 'Введите логин'
      }),
      new Input({
        name: 'password',
        label: 'Пароль',
        inputType: 'text',
        placeholder: 'Введите пароль'
      })
    ],
    events: {
      focus: (e: Event) => {
        inputValidator(e)
      },
      blur: (e: Event) => {
        inputValidator(e)
      }
    },
    button: new Button({
      label: 'Войти',
      inputType: 'submit',
      events: {
        click: (e: Event) => {
          if ((e.target as HTMLButtonElement).tagName === 'BUTTON') {
            submitValidator(e)
          }
        }
      }
    })
  }),
  link: 'Зарегистрироваться'
})
