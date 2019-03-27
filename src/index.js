import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {Provider} from 'react-redux'

import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'

const reducer = (state = {items: []}, action) => {
  const newState = Object.assign({}, state)
  switch(action.type){
    case "ADD_ITEM_REQUESTED":
      break
    case "ADD_ITEM_SUCCESS":
      console.log('successfully added item!')
      break
    case "ADD_ITEM_FAILURE":
      break

    case "GET_ITEMS_REQUESTED":
      break
    case "GET_ITEMS_SUCCESS":
      console.log('successfully got items!')
      newState.items = action.items
      break
    case "GET_ITEMS_FAILURE":
      break
  }
  return newState
}

const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk)
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('react-root')
);