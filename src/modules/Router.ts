import Route from './Route'

class Router {
  constructor(rootQuery) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  public use(pathname, block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  public start() {
    window.onpopstate = event => {
      this._onRoute(event.currentTarget?.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  private _onRoute(pathname) {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route

    route.render(route, pathname)
  }

  public go(pathname) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }

  public getRoute(pathname) {
    return this.routes.find(route => route.match(pathname))
  }
}

export default new Router('.app')
