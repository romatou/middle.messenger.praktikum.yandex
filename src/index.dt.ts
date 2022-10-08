declare module '*.hbs' {
  const tpl: (param?: any) => string
  export default tpl
}

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.png' {
  const value: any
  export default value
}
