import React, {Component} from 'react'

import Todo from './Todo'

class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="container">
        <Todo/>
      </div>
    )
  }
}

export default App




// Render component
// CSS classes, style object

// State
// Use state to render
// Change state

// Props (with subcomponent)
// Event listening (onclick)

// component lifecycle

// TODO APP
// Follow react dev cycle

// Make better with redux
// store, actions, dispatch
// connect to react w/ provider