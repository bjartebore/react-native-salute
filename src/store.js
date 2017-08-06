export default class createStore {
  constructor(state, actions) {
    this._currentState = state
    this._currentActions = actions
    this._currentListener = null

    return {
      getState: this.getState.bind(this),
      dispatch: this.dispatch.bind(this),
      subscribe: this.subscribe.bind(this)
    }
  }

  getState() {
    return this._currentState
  }

  dispatch(action) {
    this._currentState = this._currentActions(this.getState(), action)
    this._currentListener()
  }

  subscribe(listener) {
    this._currentListener = listener

    return () => {
      if(!this._currentListener) return
      this._currentListener = null
    }
  }
}
