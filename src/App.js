import React from 'react'
import Hello from './components/Hello/loadable'

import addIcon from './assets/add.svg'

import './index.less' // 记得修改测试样式

const App = () => (
  <div>
    <div className="div">Hello! This is a div from App</div>
    <img src={addIcon} alt="add-icon" />
    <Hello name="lawler" />
  </div>
)

export default App
