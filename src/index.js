import Login from './pages/login/login.js'
import Register from './pages/register/register.js'
import ServerError from './pages/500/500.js'
import PageNotFound from './pages/404/404.js'
import ChangePassword from './pages/change-password/change-password.js'
import Chats from './pages/chats/chats.js'
import Profile from './pages/profile/profile.js'

import './index.scss'

const root = document.getElementById('root')

window.onload = function () {
	switch (window.location.pathname) {
		case '/':
			root.innerHTML = Login
			break
		case '/register':
			root.innerHTML = Register
			break
		case '/500':
			root.innerHTML = ServerError
			break
		case '/chats':
			root.innerHTML = Chats
			break
		case '/profile':
			root.innerHTML = Profile
			break
		case '/change-password':
			root.innerHTML = ChangePassword
			break
		case '/404':
		default:
			root.innerHTML = PageNotFound
			break
	}
}
