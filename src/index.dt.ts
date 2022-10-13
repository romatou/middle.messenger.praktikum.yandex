declare module '*.hbs' {
  const tpl: (param?: unknown) => string
  export default tpl
}

declare module '*.png' {
  const value: string
  export default value
}
