import template from './404.hbs'
import './404.scss'

const PageNotFound = template({
	h2: 'Вы потерялись. Попробуйте поискать другую тропинку',
	linkText: 'Вернуться назад',
	link: '/',
	container: 'page-not-found'
})

export default PageNotFound
