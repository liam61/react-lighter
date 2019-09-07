import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { configure } from 'mobx'
import routes from 'routes'
import { provider } from './mobx/provider'
import './mobxDependence'

import 'assets/css/global.scss'
import 'assets/css/font-awesome.min.css'

configure({ enforceActions: 'observed' })

@provider
class App extends Component {
  render() {
    return <Router>{routes}</Router>
  }
}

export default hot(module)(App)
