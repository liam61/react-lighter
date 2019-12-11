import React, { Suspense, lazy } from 'react'
import { IProps } from './index'

const ExamplePage = lazy(() => import(/* webpackChunkName: "example" */ './index'))

export default function ExampleAsyncPage(props?: IProps) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ExamplePage {...props} />
    </Suspense>
  )
}
