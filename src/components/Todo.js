import React, { Component } from 'react'

import TLItemContainer from './TLItemContainer'
import TLAddItem from './TLAddItem'

class Todo extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h1 className="title is-3">Groceries</h1>
          <TLItemContainer/>
          <TLAddItem />
        </div>
      </div>
    )
  }
}

export default Todo