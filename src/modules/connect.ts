import isEqual from '../utils/isEqual'
import store, { StoreEvents } from '../modules/Store'

function connect(mapStateToProps: (state: any) => any) {
  return function(Component: any) {
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

export default connect
