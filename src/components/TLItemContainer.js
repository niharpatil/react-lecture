import React, { Component } from 'react'

import {connect} from 'react-redux'

class TLItemContainer extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(item => <li>{item}</li>)}
        </ul>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(TLItemContainer)