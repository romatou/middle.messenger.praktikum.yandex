import template from './chats.hbs'
import activeChat from './activeChat.hbs'
import styles from './chats.scss'
import data from '../../data/usersList.json'
import messageData from '../../data/chat.json'
import Input from '../../components/input/input'

function Chats() {
	window.addEventListener('click', e => {
		if (e.target.tagName === 'A') {
			e.target.classList.add('active')
			let chat = document.querySelector('.chat')
			chat.innerHTML = activeChat({
				messages: messageData
			})
		}
	})

	return template({
		people: data.people,
		container: 'chats',
		input: Input('search', 'text', 'Поиск чата')
	})
}

export default Chats()
