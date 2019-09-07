import React from 'react'
import { autobind } from 'core-decorators';
import { Button } from 'antd-mobile'
import './index.less'

interface IProps {
  name: string
}

@autobind
class Hello extends React.PureComponent<IProps> {
  state = { count: 1 }

  handleClick() {
    const { count } = this.state
    this.setState({ count: count + 1 })
  }

  render() {
    const { name } = this.props
    const { count } = this.state
    return (
      <div>
        <div>This is Example component.</div>
        <div className="name">{`my name is ${name}`}</div>
        <Button type="warning" onClick={this.handleClick}>{`局部刷新 state 不变：count ${count}`}</Button>
        <div className="ruiwen">this is ruiwen</div>
      </div>
    )
  }
}

export default Hello
