import Route from './Route'

class Router {
  private static __instance: Router
  private routes: Route[] = []
  private _currentRoute: Route | null = null
  private history = window.history

  constructor(private readonly _rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []

    Router.__instance = this
  }

  public use(pathname: string, block: any) {
    const route = new Route(pathname, block, this._rootQuery)
    this.routes.push(route)
    return this
  }

  public start() {
    window.onpopstate = event => {
      const target = event.currentTarget as Window

      this._onRoute(target.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route

    route.render()
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }

  public getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname))
  }
}

export default new Router('.app')
