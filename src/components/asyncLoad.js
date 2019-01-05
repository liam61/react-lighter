import React, { Component } from 'react'

// 使用 HOC 高阶函数来 chunk 加载组件
export default function asyncLoad(importCallback, props) {
  return class AsyncComponent extends Component {
    state = {
      component: null
    }

    async componentDidMount() {
      this.setState({
        component: (await importCallback()).default
      })
    }

    render() {
      const { component: Comp } = this.state
      if (Comp) {
        return <Comp {...props} />
      }
      return null
    }
  }
}
