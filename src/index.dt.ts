declare module '*.hbs' {
  const tpl: (param?: any) => string
  export default tpl
}

declare module 'uuid' {
  const uuid: (param?: any) => string
  export default uuid
}

declare module '*.json' {
  const value: any
  export default value
}
