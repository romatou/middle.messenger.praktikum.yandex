import styles from './login.scss'
import template from './login.hbs'
import Button from '../../components/button/button.js'
import Input from '../../components/input/input.js'

const Login = template({
	container: 'auth',
	title: 'Войти в чат',
	action: '/chats',
	button: Button('btn', 'submit', 'Войти'),
	Link: 'Зарегистрироваться',
	fields: [
		Input('Login', 'text', 'Ваш логин'),
		Input('Password', 'password', 'Ваш пароль')
	]
})

export default Login
