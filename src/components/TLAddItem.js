import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class TLAddItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      input: ""
    }
    this.addItem = this.addItem.bind(this)
  }

  addItem(){
    const currentInput = this.state.input
    this.props.addItemToStore(currentInput)
    this.setState({input:""})
  }

  render() {
    return (
      <div className="level">
        <div className="level-item">
          <div class="control">
            <input 
              value={this.state.input} 
              onChange={e => this.setState({input: e.target.value})}
              class="input" 
              type="text" 
              placeholder="Text input" 
            />
          </div>
        </div>
        <div className="level-item">
          <button onClick={this.addItem} className="button is-primary">+</button>
        </div>
      </div>
    )
  }
}


function addItem(item) {
  return dispatch => {
    dispatch({
      type: 'ADD_ITEM_REQUESTED'
    })
    axios.post('/api/additem',{
      itemTitle: item
    })
    .then(resp => {
      console.log(resp)
      dispatch({
        type: 'ADD_ITEM_SUCCESS'
      })
    })
    .catch(e => {
      dispatch({
        type: 'ADD_ITEM_FAILURE'
      })
    })
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addItemToStore: item => dispatch(addItem(item)) 
  }
}

export default connect(null, mapDispatchToProps)(TLAddItem)