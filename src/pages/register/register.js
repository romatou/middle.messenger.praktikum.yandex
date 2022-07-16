import './register.scss'
import template from './register.hbs'
import Button from '../../components/button/button.js'
import Input from '../../components/input/input.js'

const Register = template({
	container: 'register',
	button: Button('btn', 'submit', 'Зарегистрироваться'),
	fields: [
		Input('Email', 'email', 'Email'),
		Input('Login', 'text', 'Логин'),
		Input('Name', 'text', 'Имя'),
		Input('Surname', 'text', 'Фамилия'),
		Input('Phone', 'tel', 'Мобильный номер'),
		Input('Password', 'password', 'Пароль'),
		Input('Password', 'confirm_password', 'Еще раз пароль')
	]
})

export default Register
