import Register from './Register'
import Form from '../../components/form/Form'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import { inputValidator, submitValidator } from '../../utils/validation'

export const pageRegister = new Register({
  title: 'Войти',
  events: {
    submit: (e: Event) => {
      e.preventDefault()
      const fields = document.querySelectorAll('input')
      const data = {}
      fields.forEach(cur => {
        data[cur.name] = cur.value
      }),
      console.log(data)
    }
  },
  form: new Form({
    fields: [
      new Input({
        name: 'email',
        label: 'Почтовый адрес',
        inputType: 'email',
        placeholder: 'Введите адрес электронной почты'
      }),
      new Input({
        name: 'first_name',
        label: 'Имя',
        inputType: 'text',
        placeholder: 'Введите имя'
      }),
      new Input({
        name: 'second_name',
        label: 'Фамилия',
        inputType: 'text',
        placeholder: 'Введите фамилию'
      }),
      new Input({
        name: 'login',
        label: 'Логин',
        inputType: 'text',
        placeholder: 'Введите логин'
      }),
      new Input({
        name: 'phone',
        label: 'Телефон',
        inputType: 'tel',
        placeholder: 'Введите номер мобильного телефона'
      }),
      new Input({
        name: 'password',
        label: 'Пароль',
        inputType: 'text',
        placeholder: 'Введите пароль'
      }),
      new Input({
        name: 'password_confirmation',
        label: 'Пароль еще раз',
        inputType: 'text',
        placeholder: 'Еще раз пароль'
      })
    ],
    events: {
      focus: e => {
        inputValidator(e)
      },
      blur: e => {
        inputValidator(e)
      }
    },
    button: new Button({
      label: 'Зарегистрироваться',
      inputType: 'submit',
      events: {
        click: (e: Event) => {
          if ((e.target as HTMLElement).tagName == 'BUTTON') {
            e.preventDefault()
            submitValidator(e)
          }
        }
      }
    })
  }),
  link: 'Зарегистрироваться'
})
