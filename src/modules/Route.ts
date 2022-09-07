import isEqualStringify from '../utils/isEqualStringify'
import renderDOM from '../modules/renderDOM'

export default class Route {
  constructor(pathname, view, props) {
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
    this._block = this._blockClass
    renderDOM(this._props.rootQuery, this._block)
    return
  }
}
