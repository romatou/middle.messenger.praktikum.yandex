import ServerError from './ServerError'
import './ServerError.scss'

export const pageServerError = new ServerError({
  className: 'server-error',
  title: '500',
  paragraph: 'Проблема на сервере. Уже чиним',
  link: 'Вернуться на главную'
})
