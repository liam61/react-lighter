import { IStoresToProps, IReactComponent, IWrappedComponent } from 'mobx-react'
import ExampleExampleStore from '../pages/Example/stores/exampleStore'
import ExampleExampleAction from '../pages/Example/actions/exampleAction'

export interface IRootStore {
  Example: {
    exampleStore: ExampleExampleStore
  }
}

export interface IRootAction {
  Example: {
    exampleAction: ExampleExampleAction
  }
}

export interface IInject {
  rootStore: IRootStore
  rootAction: IRootAction
}

declare module 'mobx-react' {
  export type IValueMapSelf = IStoresToProps<IInject>

  export function inject<S extends IInject, P, I, C>(
    fn: IStoresToProps<S, P, I, C>,
  ): <T extends IReactComponent>(target: T) => T & IWrappedComponent<P>
}
