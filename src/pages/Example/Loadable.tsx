import React, { Suspense, lazy } from 'react'

const Page = lazy(() => import(/* webpackChunkName: "example" */ './index'))

const Loadable = () => {
  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <Page />
    </Suspense>
  )
}

export default Loadable
