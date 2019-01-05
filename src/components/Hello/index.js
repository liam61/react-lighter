import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// import asyncLoad from '../asyncLoad'

import './styles'

// const My = asyncLoad(() => import('../My'))

class Hello extends PureComponent {
  static propTypes = {
    num: PropTypes.number.isRequired
  }

  state = {
    count: 1
  }

  handleClick = () => {
    const { count } = this.state
    this.setState({ count: count + 1 })
  }

  render() {
    console.log(this.props)
    const { num } = this.props
    const { count } = this.state
    return (
      <div>
        <h1>This is from Hello component.</h1>
        <h2 className="h2">this is h2</h2>
        <div className="num">
          the num is
          {num}
        </div>
        <button className="btn" type="button" onClick={this.handleClick}>
          the count
          {count}
        </button>
        <div className="ruiwen">this is ruiwen</div>
      </div>
    )
  }
}

export default Hello
