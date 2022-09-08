import EventBus from './EventBus'
import set from '../utils/set'

export enum StoreEvents {
  Updated = 'Обновление хранилища',
}

export const state = {}

class Store extends EventBus {
  private state: Record<string, any> = {}

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvents.Updated)
  }
}

export default new Store()
