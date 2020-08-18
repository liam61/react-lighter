import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import routesConfig from './config'

function getRoutes(routes = routesConfig) {
  return routes.map(route => {
    const { key, redirect, children, component } = route
    const Comp = component as any

    if (children) {
      return (
        <Comp key={key}>
          <Switch>{getRoutes(children)}</Switch>
        </Comp>
      )
    }

    return redirect ? <Redirect to={redirect} {...route} /> : <Route {...route} />
  })
}

export default <Switch>{getRoutes()}</Switch>
