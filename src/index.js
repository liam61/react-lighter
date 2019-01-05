import React from 'react'
import { render } from 'react-dom'
import App from './App'

const root = document.getElementById('root')

function renderAppToContainer() {
  render(<App />, root)
}

renderAppToContainer()

// if (module.hot) {
//   module.hot.accept('./App.js', () => {
//     renderAppToContainer()
//   })
// }
