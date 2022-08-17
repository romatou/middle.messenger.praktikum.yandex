import Profile from './Profile'
import Button from '../../components/button/Button'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Avatar from '../../components/avatar/Avatar'
import './profile.scss'
import { inputValidator, submitValidator } from '../../utils/validation'

export const pageProfile = new Profile({
  link: 'Назад к чатам',
  avatar: new Avatar({
    image: `https://api.time.com/
wp-content/uploads/2017/12/
terry-crews-person-of-year-2017-time-magazine-2.jpg
`,
    name: 'profile-logo'
  }),
  events: {
    submit: (e: Event) => {
      e.preventDefault()
      submitValidator(e)
    }
  },
  form: new Form({
    events: {
      blur: (e: Event) => {
        inputValidator(e)
      },
      focus: (e: Event) => {
        inputValidator(e)
      }
    },
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
