# react-lighter

to initialize your react project as simple as lighting a fire

初始化 react 项目

## 技术栈

react + mobx + router + antd + axios

## 目录结构

```markdown
├── src // 项目主目录
│   ├── assets
│   ├── components // 可重用组件
│   ├── index.tsx
│   ├── interface.ts
│   ├── mobx // mobx 注入工具
│   ├── pages // 项目界面
│   │   ├── 404
│   │   └── Example
│   ├── routes
│   ├── tools // 脚手架
│   ├── utils
│   └── websocket
└── config // webpack 配置
```

## 运行

```bash
yarn or npm i

yarn dll

yarn start // for dev

yarn build && yarn server // for prod
```

## 特点

### 一、热加载

采用 [react-hot-loader](https://github.com/gaearon/react-hot-loader) 配合 babel，可实现样式替换、节点改变不影响 state 等功能，达到局部热加载的效果

### 二、抽离 dll

使用 webpack DllReferencePlugin 插件，先把 react 抽离成 dll，在后续开发中能更快加载

### 三、多线程打包

使用 [happypack](https://github.com/amireh/happypack) 启动多线程，实现光速打包

### 四、css 处理

1. 使用 [postcss](https://github.com/postcss/postcss) 提供样式兼容

2. 使用 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 抽离 css

3. 使用 [purgecss-webpack-plugin](https://github.com/FullHuman/purgecss-webpack-plugin) 去除无用 css

4. 使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 规范长度单位

### 五、mobx 注入

参考：

- [用mobx构建大型项目的最佳实践](https://juejin.im/post/5c627df76fb9a049c232e990)

- [mobx 项目最佳实践](https://github.com/luruozhou/mobx-example)

1. mobx 分层：views、actions、stores

> views 派发 actions，由 actions 做逻辑处理后调用 stores 做数据持久化，views 通过注入的 stores 获取到最新的数据。典型的 MVC 架构
>
> 解决了 mobx 中数据随处可定义、逻辑交互方法随处可声明等问题

2. 唯一数据源

> 每个 view 绑定 store 数据源，顶层 view 保存着全局数据源，类似于 redux 的 createStore 机制
>
> 实现了 stores 间交叉引用的可能，同时能够达到 redux 中 initialState 的“数据恢复”机制

3. 按需实例化

> 通过 [ts-plugin-mmlpx 插件](https://github.com/mmlpxjs/ts-plugin-mmlpx)，实现 stores 和 actions 的自动查找和绑定、通过 Object.defineProperty 实现按需实例化，提高性能

4. tools 脚手架使用

> 参见 [mobx example 开发章节](https://github.com/luruozhou/mobx-example#%E5%BC%80%E5%8F%91)

### 六、Axios 封装

参考

- [axios restful 封装](https://github.com/zhaotoday/rest)

将 axios 进行 restful 风格的封装，配合 interceptor 和 histroy 进行权限验证和跳转

使用：

1. GET /users/:id

```js
request.setPath('users').get({ uri: 'lawler' })
```

2. POST /users

```js
request.setPath('users').post({
  data: { email: 'lawler61@163.com', password: '123456' }
})
```

3. PUT /users/:id

```js
request.setPath('users').put({
  uri: 'lawler', data: { name: 'jeffery' }
})
```

4. DELETE /users/:id

```js
request.setPath('users').delete({ uri: 'lawler' })
```

5. GET /users/:id/articles?page=2&limit=10

```js
request.setPath('users/{id}/articles').replace('lawler').get({
  query: { page: 2, limit: 10 }
})
```

6. PATCH /users/:id/articles/:id

```js
request.setPath('users/{id}/articles/{id}').replace('lawler', 'react 学习之路').patch({
  data: { title: '前端学习' }
})
```

## 项目展示

1. [问答系统 前端 -> https://github.com/lawler61/qa-app](https://github.com/lawler61/qa-app)

2. [线上地址，去看看 -> https://qa.omyleon.com](https://qa.omyleon.com)
