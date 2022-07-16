import styles from './500.scss'
import template from './500.hbs'

const ServerError = template({
	container: 'server-error',
	text: 'Ошибка на стороне сервера. Мы уже исправляем',
	link: '/',
	textLink: 'Вернуться назад'
})

export default ServerError
