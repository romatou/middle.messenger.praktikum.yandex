import styles from './change-password.scss'
import template from './change-password.hbs'
import data from '../../data/profileData.json'

const ChangePassword = template({
	profileData: data,
	profileAvatar: data.avatar,
	container: 'change-password'
})

export default ChangePassword
