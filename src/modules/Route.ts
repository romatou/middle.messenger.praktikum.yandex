import isEqualStringify from '../utils/isEqualStringify'
import Block from '../modules/Block'
import renderDOM from '../modules/renderDOM'

export default class Route {
  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.remove()
    }
  }

  match(pathname) {
    return isEqualStringify(pathname, this._pathname)
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass
    }
    renderDOM(this._props.rootQuery, this._block)
    return
  }
}
