import Block from '../modules/Block'
import isEqual from '../utils/isEqual'
import store, { StoreEvents } from '../modules/Store'

export default function connect(Component: typeof Block) {
  return class extends Component {
    constructor(...args) {
      super(...args)

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...store.getState() })
      })
    }
  }
}
