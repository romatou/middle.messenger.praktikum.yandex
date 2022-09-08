import NotFound from './NotFound'
import Link from '../../components/link/Link'

const notFound = new NotFound({
  title: 'Страница не найдена',
  link: new Link({
    text: 'Вернуться на главную',
    to: 'sign-up',
  }),
})

export default notFound
