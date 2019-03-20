import React, { Component } from 'react'
import {connect} from 'react-redux'

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


const mapDispatchToProps = dispatch => {
  return {
    addItemToStore: item => dispatch({
      type: "ADD_TODO_ITEM",
      newItem: item
    }) 
  }
}

export default connect(null, mapDispatchToProps)(TLAddItem)