import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'

interface IGoods {
  id: string
  name: string
  desc: string
}

@mStore
export default class ExampleStore {
  @observable
  curGoods = {} as IGoods

  @observable
  loading = true

  @action
  setCurGoods(goods: IGoods) {
    this.curGoods = goods
    return this
  }

  @action
  setLoading(flag: boolean) {
    this.loading = flag
    return this
  }
}
