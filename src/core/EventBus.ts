interface EventBus {
  listeners: Record<string, any>
}

class EventBus {
  constructor() {
    this.listeners = {}
  }

  public on(event: string, callback: any): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  public off(event: string, callback: any): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    )
  }

  public emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(function(listener) {
      listener(...args)
    })
  }
}

export default EventBus

export {EventBus}
