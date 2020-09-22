import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { configure } from 'mobx'
import routes from 'routes'
import { provider } from './mobx/provider'
import './mobxDependence'

import 'assets/css/global.scss'

configure({ enforceActions: 'observed' })

export default provider(() => <Router>{routes}</Router>)
