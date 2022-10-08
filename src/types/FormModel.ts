export type LoginFormModel = {
  login: string
  password: string
}

export type RegisterFormModel = {
  email: string
  first_name: string
  second_name: string
  login: string
  phone: string
  password: string
}

export type UpdateUserData = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export type UpdateUserPassword = {
  oldPassword: string
  newPassword: string
}

export type CreateChat = {
  title: string
}
