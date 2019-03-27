import React, { Component } from 'react'

import {connect} from 'react-redux'
import axios from 'axios'

class TLItemContainer extends Component {
  constructor(props){
    super(props)
    setInterval(() => {
      this.props.getItems()
    }, 1000)
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(item => <li>{item.title}</li>)}
        </ul>
      </div>
    )
  }
}





function getItemsFromDb(){
  return dispatch => {
    dispatch({
      type: 'GET_ITEMS_REQUESTED',
    })
    axios.get('/api/todoitems')
    .then(resp => {
      const items = resp.data
      dispatch({
        type: 'GET_ITEMS_SUCCESS',
        items
      })
    })
    .catch(error => {
      dispatch({
        type: 'GET_ITEMS_FAILURE',
        error
      })
    })
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getItems: () => dispatch(getItemsFromDb())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TLItemContainer)