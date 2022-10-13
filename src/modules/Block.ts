import EventBus from './EventBus'
import { v4 as uuid } from 'uuid'

abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _element: Element | null = null
  public eventBus: any
  private readonly _meta: Record<string, any>
  private readonly _id: string
  public children: any
  public withInternalID = false
  public props: any

  constructor(tagName = 'div', propsAndChildren?: any) {
    const { children, props } = this._getChildren(propsAndChildren)
    this.children = children

    const eventBus = new EventBus()

    this._id = uuid()

    this._meta = {
      tagName,
      props,
    }

    this.props = this._makePropsProxy({ ...props, _id: this._id })

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _getChildren(propsAndChildren: any) {
    const children: any = {}
    const props: any = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else if (
        Array.isArray(value) &&
        value.every(value => value instanceof Block)
      ) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources(): void {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
  }

  public init(): void {
    this._createResources()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  public get element() {
    return this._element
  }

  private _componentDidMount(): boolean {
    return this.componentDidMount()
  }

  public componentDidMount(): boolean {
    return true
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(): void {
    this._render()
  }

  protected addEvents(): void {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  protected removeEvents(): void {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  public setProps = (nextProps: any): null | undefined => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  private _render(): void {
    const block: any = this.render()
    this.removeEvents()

    if (this._element !== null) {
      this._element.innerHTML = ''
    }

    this._element?.append(block)
    this.addEvents()
  }

  public render() {
    throw Error('Добавьте метод render()')
  }

  public getContent() {
    return this._element
  }

  private _makePropsProxy(props: any) {
    const self = this

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Отказано в доступе')
        }

        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldValue = { ...target }
        target[prop] = value
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element: HTMLElement = document.createElement(tagName)
    element.setAttribute('data-id', this._id)
    return element
  }

  compile(template: any, props: any): DocumentFragment {
    const propsAndStubs: Record<any, any> = { ...props }
    Object.entries(this.children).forEach(([key, child]: any) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = []
        for (let i = 0; i < child.length; i++) {
          propsAndStubs[key][i] = `<div data-id="${child[i]._id}"></div>`
        }
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
    })

    const fragment: any = this._createDocumentElement('template')

    fragment.innerHTML = template(propsAndStubs)
    Object.values(this.children).forEach((child: any) => {
      if (Array.isArray(child)) {
        for (let i = 0; i < child.length; i++) {
          const stub: HTMLElement = fragment.content.querySelector(
            `[data-id="${child[i]._id}"]`
          )
          if (stub) {
            stub.replaceWith(child[i].getContent())
          }
        }
      } else {
        const stub: HTMLElement = fragment.content.querySelector(
          `[data-id="${child._id}"]`
        )

        if (stub) {
          stub.replaceWith(child.getContent())
        }
      }
    })

    return fragment.content
  }

  remove() {
    this._element?.remove()
  }
}

export default Block
