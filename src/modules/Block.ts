import EventBus from './EventBus'
import { v4 } from 'uuid'

abstract class Block<Props> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _element: Nullable<HTMLElement> = null
  public eventBus: () => void = EventBus
  private readonly _meta: Record<string, Props>
  private readonly _id: string
  public children: Props
  public withInternalID = false
  protected props: Record<string, string | object>

  constructor(tagName = 'div', propsAndChildren: Props) {
    const { children, props } = this._getChildren(propsAndChildren)
    this.children = children

    const eventBus = new EventBus()

    this._id = v4()

    this._meta = {
      tagName,
      props,
    }

    this.props = this._makePropsProxy({ ...props, _id: this._id })

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _getChildren(propsAndChildren: Record<string, Props | string>) {
    const children = {}
    const props = {}

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

  private _registerEvents(eventBus): void {
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

  private _componentDidMount(): boolean {
    return this.componentDidMount()
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount()
    })
  }

  public componentDidMount(): boolean {
    return true
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    this._render()
  }

  protected addEvents(): void {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName])
    })
  }

  protected removeEvents(): void {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName])
    })
  }

  public setProps = (nextProps: Props): null | undefined => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element(): HTMLElement | null {
    return this._element
  }

  private _render(): HTMLElement {
    const block: HTMLElement = this.render()
    this.removeEvents()
    this._element.innerHTML = ''

    this._element.append(block)

    this.addEvents()
  }

  protected render()

  protected getContent(): HTMLElement | null {
    return this.element
  }

  private _makePropsProxy(props: Props) {
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

  compile(template: string, props: unknown): DocumentFragment {
    const propsAndStubs = { ...props }
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = []
        for (let i = 0; i < child.length; i++) {
          propsAndStubs[key][i] = `<div data-id="${child[i]._id}"></div>`
        }
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
    })

    const fragment: HTMLElement = this._createDocumentElement('template')

    fragment.innerHTML = template(propsAndStubs)
    Object.values(this.children).forEach((child: HTMLElement) => {
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
    this._element.remove()
  }
}

export default Block
