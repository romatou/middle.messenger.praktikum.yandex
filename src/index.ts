import { pageLogin } from './pages/login'
import { pageRegister } from './pages/register'
import { pageServerError } from './pages/serverError'
import { pageNotFound } from './pages/notFound'
import { pageChangePass } from './pages/changePass'
import { pageChats } from './pages/chats'
import { pageProfile } from './pages/profile'

import renderDOM from './core/renderDOM'

import './scss/main.scss'

document.addEventListener('DOMContentLoaded', () => {
  window.onload = function () {
    renderDOM('.app', pageLogin)
    switch (window.location.pathname) {
    case '/':
      renderDOM('.app', pageLogin)
      break
    case '/register':
      renderDOM('.app', pageRegister)
      break
    case '/chats':
      renderDOM('.app', pageChats)
      break
    case '/profile':
      renderDOM('.app', pageProfile)
      break
    case '/change-password':
      renderDOM('.app', pageChangePass)
      break
    case '/500':
      renderDOM('.app', pageServerError)
      break
    case '/404':
    default:
      renderDOM('.app', pageNotFound)
      break
    }
  }
})
