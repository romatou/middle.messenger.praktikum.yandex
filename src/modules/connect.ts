import Block from '../modules/Block'
import isEqual from '../utils/isEqual'
import store, { StoreEvents } from '../modules/Store'

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState())

        super({ ...props, ...state })

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState())

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          state = newState
        })
      }
    }
  }
}
