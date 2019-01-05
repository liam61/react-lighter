import React from 'react'
import { hot } from 'react-hot-loader'
import Hello from './components/Hello'
// import asyncLoad from './components/asyncLoad'

import removeIcon from './assets/remove.svg'

import './index.css'
import './index.less'

// const Hello = asyncLoad(() => import('./components/Hello'), { num: 1 })

const App = () => (
  <div>
    <div className="div">Hello! This is a div from App</div>
    <img src={removeIcon} alt="remove-icon" />
    <Hello num={1} />
  </div>
)

export default hot(module)(App)
