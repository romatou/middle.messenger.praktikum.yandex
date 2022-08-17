import PageNotFound from './NotFound'

export const pageNotFound = new PageNotFound({
  title: 'Страница не найдена',
  link: '/',
  linkText: 'Вернуться на главную'
})
// const PageNotFound = template({
// 	h2: 'Вы потерялись. Попробуйте поискать другую тропинку',
// 	linkText: 'Вернуться назад',
// 	link: '/',
// 	container: 'page-not-found',
// })
