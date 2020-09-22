import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import ExampleCom from 'components/ExampleCom'
import { IRootStore, IRootAction } from 'typings'
import successIcon from 'assets/images/success.svg'
import './index.scss'

@inject(injector)
@observer
export default class Example extends React.Component<IProps, {}> {
  static defaultProps = {
    prefixCls: 'page-example',
  }

  componentDidMount() {
    this.handleLoadGoods()
  }

  handleLoadGoods = () => {
    this.props.action!.loadGoods()
  }

  render() {
    const { prefixCls, store } = this.props
    const {
      curGoods: { name, desc },
      loading,
    } = store!

    return (
      <div className={prefixCls}>
        <h1>this is Example page</h1>
        <ExampleCom name='lawler' />
        <img src={successIcon} width='30' alt='successIcon' />
        <h2>当前产品</h2>
        {loading ? (
          <h1 className='loading'>loading...</h1>
        ) : (
          <ul>
            <li>{name}</li>
            <li>{desc}</li>
          </ul>
        )}
        <Button type='primary' onClick={this.handleLoadGoods} disabled={loading}>
          换一个
        </Button>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Example.exampleStore,
    action: rootAction.Example.exampleAction,
  }
}
