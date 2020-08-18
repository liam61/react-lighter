import React from 'react'
import ExamplePage from 'pages/Example/Loadable'
import NoMatchPage from 'pages/404'

export interface IRoute {
  key: string
  path?: string
  component?: React.ComponentClass | React.FunctionComponent
  props?: object
  exact?: boolean
  redirect?: string
  children?: IRoute[]
}

const config: IRoute[] = [
  { key: 'home', path: '/', exact: true, redirect: '/home' },
  { key: 'example', path: '/home', component: ExamplePage },
  { key: '404', component: NoMatchPage },
]

export default config
