import EventBus from './EventBus'
import set from '../utils/set'

type Indexed<T = any> = {
  [key in string]: T
}

export enum StoreEvents {
  Updated = 'updated',
}

export const state = {}

class Store extends EventBus {
  private state: Indexed = {}

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvents.Updated)
  }
}

const store = new Store()

export default store
