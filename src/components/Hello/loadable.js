/**
 * Asynchronously loads the component for Hello
 */
import React from 'react'
import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: <h1>Loading...</h1>
})
