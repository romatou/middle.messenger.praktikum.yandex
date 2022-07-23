import styles from './profile.scss'
import template from './profile.hbs'
import data from '../../data/profileData.json'

const Profile = template({
	sidebar: styles.sidebar,
	container: 'profile',
	profileData: data,
	profileAvatar: data.avatar
})

export default Profile
