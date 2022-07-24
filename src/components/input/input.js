import template from './input.hbs'
import './input.scss'

function Input(name, type, placeholder) {
	return template({
		inputName: name,
		inputType: type,
		inputPlaceholder: placeholder
	})
}

export default Input
