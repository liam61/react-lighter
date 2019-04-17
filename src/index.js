import React from 'react'
import { render } from 'react-dom'
import AppHot from './App.hot'

const root = document.getElementById('root')

function renderAppToContainer() {
  render(<AppHot />, root)
}

renderAppToContainer()
