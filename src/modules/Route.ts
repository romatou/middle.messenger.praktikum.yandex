import Block from '../modules/Block'
import renderDOM from '../modules/renderDOM'

export default class Route {
  private _pathname: string
  private _blockClass: typeof Block
  private _block: any | null
  private _props: string

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave(): void {
    if (this._block) {
      this._block = null
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass
    }

    renderDOM(this._props, this._block)
    return
  }
}
