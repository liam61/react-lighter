import React from 'react'
import { hot } from 'react-hot-loader'
import Hello from './components/Hello'

import addIcon from './assets/add.svg'

import './index.less' // 记得修改测试的样式

const App = () => (
  <div>
    <div className="div">Hello! This is a div from App</div>
    <img src={addIcon} alt="add-icon" />
    <Hello name="lawler" />
  </div>
)

export default hot(module)(App)
