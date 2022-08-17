const REGEXP = {
  login: {
    message: 'Логин может начинаться только с буквы',
    expression:
      /(?=[a-zA-Z_-])+(^[0-9a-zA-Z_-]{3,20}$)|(^[0-9a-zA-Z_-]{3,20}$)(?=[a-zA-Z_-])/,
  },
  email: {
    message: 'Формат почты ****@**.***',
    expression: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/,
  },
  first_name: {
    message: 'Имя должно начинаться c большой буквы',
    expression: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
  },
  second_name: {
    message: 'Имя должно начинаться c большой буквы',
    expression: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
  },
  password: {
    message: 'Пароль должен содержать минимум 1 большую букву и цифру',
    expression: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  },
  password_confirmation: {
    message: 'Пароль должен содержать минимум 1 большую букву и цифру',
    expression: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  },
  phone: {
    message: 'Телефон может содержать цифры и начинаться с +',
    expression: /^([+]{1})?[0-9]{11,15}$/,
  },
  message: {
    message: 'Не должно быть пустым',
    expression: /^[^]+$/,
  },
}

export default REGEXP
