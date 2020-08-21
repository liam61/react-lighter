import React, { Suspense, lazy } from 'react'

const Page = lazy(() => import(/* webpackChunkName: "example" */ './index'))

const Loadable = () => {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Page />
    </Suspense>
  )
}

export default Loadable
