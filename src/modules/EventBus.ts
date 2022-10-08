class EventBus {
  private listeners: any

  constructor() {
    this.listeners = {}
  }

  public on(event: string, callback: (...args: string[]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  public off(event: string, callback: (...args: string[]) => void): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: any) => listener !== callback
    )
  }

  public emit(event: string, ...args: string[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(function(listener: any) {
      listener(...args)
    })
  }
}

export default EventBus
