import EventEmitter from 'eventemitter3';

export default class createStore {
  constructor(state, actions) {
    this._currentState = state
    this._currentActions = actions
    this._emitter = new EventEmitter();

    return {
      getState: this.getState.bind(this),
      dispatch: this.dispatch.bind(this),
      subscribe: this.subscribe.bind(this),
    }
  }

  getState() {
    return this._currentState
  }

  dispatch(action) {
    this._currentState = this._currentActions(this.getState(), action)
    this._emitter.emit('change', this.getState());
  }

  subscribe(listener) {
    this._emitter.on('change', listener);
    return () => this._emitter.removeListener('change', listener);
  }
}
