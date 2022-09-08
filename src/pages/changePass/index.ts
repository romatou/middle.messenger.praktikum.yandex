import ChangePass from './ChangePass'
import Button from '../../components/button/Button'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Avatar from '../../components/avatar/Avatar'
import { validateSubmit } from '../../utils/validate'
import './style.scss'

export const pageChangePass = new ChangePass({
  avatar: new Avatar({
    image: `https://api.time.com/wp-content/uploads/2017/12/
terry-crews-person-of-year-2017-time-magazine-2.jpg`,
    name: 'profile-logo'
  }),
  events: {
    submit: e => {
      e.preventDefault()
      validateSubmit(e)
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
        name: 'last_name',
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
        inputType: 'password',
        placeholder: 'Введите пароль'
      }),
      new Input({
        name: 'password',
        label: 'Пароль еще раз',
        inputType: 'password',
        placeholder: 'Еще раз пароль'
      })
    ],
    button: new Button({
      label: 'Сохранить',
      inputType: 'submit'
    })
  })
})
