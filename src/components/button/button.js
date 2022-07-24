import template from './button.hbs'
import './button.scss'

function Button(className, type, label) {
	return template({
		btnClass: className,
		btnType: type,
		btnText: label
	})
}

export default Button
