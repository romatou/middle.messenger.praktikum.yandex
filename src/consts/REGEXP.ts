const REGEXP = {
  login: {
    message: 'Логин может начинаться только с буквы',
    title: 'Логин',
    expression:
      /(?=[a-zA-Z_-])+(^[0-9a-zA-Z_-]{3,20}$)|(^[0-9a-zA-Z_-]{3,20}$)(?=[a-zA-Z_-])/,
  },
  email: {
    message: 'Формат почты ****@**.***',
    title: 'Email',
    expression: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/,
  },
  first_name: {
    message: 'Имя должно начинаться c большой буквы',
    title: 'Имя',
    expression: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
  },
  second_name: {
    message: 'Имя должно начинаться c большой буквы',
    title: 'Фамилия',
    expression: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
  },
  password: {
    message: 'Пароль должен содержать минимум 1 большую букву и цифру',
    title: 'Пароль',
    expression: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  },
  oldPassword: {
    message: 'Пароль должен содержать минимум 1 большую букву и цифру',
    title: 'Пароль',
    expression: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  },
  newPassword: {
    message: 'Пароль должен содержать минимум 1 большую букву и цифру',
    title: 'Пароль',
    expression: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  },
  phone: {
    message: 'Телефон может содержать цифры и начинаться с +',
    title: 'Телефон',
    expression: /^([+]{1})?[0-9]{11,15}$/,
  },
  message: {
    message: 'Не должно быть пустым',
    title: 'Сообщение',
    expression: /^[^]+$/,
  },
}

export default REGEXP
