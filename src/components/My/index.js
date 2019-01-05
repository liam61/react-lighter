import React, { PureComponent } from 'react'

class My extends PureComponent {
  constructor() {
    super()

    console.log('initial My Component')
  }

  componentWillUnmount() {
    console.log('unmount My Component')
  }

  render() {
    console.log('render My Component')

    return (
      <div>
        <h1>This is from My component.</h1>
      </div>
    )
  }
}

export default My
