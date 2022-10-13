type EventBusListener = (...args: string[]) => void

class EventBus {
  private listeners: Record<string, EventBusListener[]> = {}

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
      (listener: EventBusListener) => listener !== callback
    )
  }

  public emit(event: string, ...args: string[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(function(listener: EventBusListener) {
      listener(...args)
    })
  }
}

export default EventBus
