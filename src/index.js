import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {Provider} from 'react-redux'

import {createStore} from 'redux'

const reducer = (state = {items: []}, action) => {
  const newState = Object.assign({}, state)
  switch(action.type){
    case "ADD_TODO_ITEM":
      newState.items = newState.items.slice()
      newState.items.push(action.newItem)
      return newState
  }
  return newState
}

const store = createStore(
  reducer
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('react-root')
);