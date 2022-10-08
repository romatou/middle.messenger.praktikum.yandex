import Router from './modules/Router'

import login from './pages/login'
import register from './pages/register'
import chats from './pages/chats'
import notFound from './pages/notFound'
import serverError from './pages/serverError'
import profile from './pages/profile'
import changeData from './pages/profile/changeData/'
import changePass from './pages/profile/changePass/'
import changeAvatar from './pages/profile/changeAvatar/'

import './scss/main.scss'

document.addEventListener('DOMContentLoaded', () => {
  Router.use('/', login)
    .use('/sign-up', register)
    .use('/messenger', chats)
    .use('/500', serverError)
    .use('*', notFound)
    .use('/settings', profile)
    .use('/settings/change-data', changeData)
    .use('/settings/change-password', changePass)
    .use('/settings/change-avatar', changeAvatar)
    .start()
})
