# vue-pipeline

仿照 jenkins blue ocean 的一个 pipeline 组件,可以根据数据结构动态的渲染出复杂的流程图,进度图等树型图或者有向无环图.

[github 主页](/https://github.com/jinfang134/vue-pipeline)

![sample](https://github.com/jinfang134/vue-pipeline/raw/master/resources/sample.png)

快速开始:

- [Demo](https://jinfang134.github.io/vue-pipeline/)

## LICENSE

**NOTE:** Vue Pipeline 是基于 [The MIT License](https://github.com/jinfang134/vue-pipeline/blob/master/LICENSE) 协议完全开源. 如果您觉得这个插件对您有用,请赏个 star,谢谢!

## Features

- 根据源数据动态创建图形
- 响应式设计
- 基于 svg
- 可配置的
- 显示/隐藏箭头
- 支持 3 种不同种类的线型
- 支持树和有向无环图
- 节点事件触发
- 每个节点显示不同的状态
- 不同颜色和权重的边
- 线条样式,节点颜色可以根据 css 进行配置

## 安装

```
npm install vue-pipeline
```

```
import Vue from 'vue'
import VuePipeline from 'vue-pipeline'

Vue.use(VuePipeline)

```

## 属性

### Pipeline 的属性

| Name      | Type    | Default | Description                                              |
| --------- | ------- | ------- | -------------------------------------------------------- |
| x         | number  | 50      | 第一个节点的 x 坐标                                      |
| y         | number  | 55      | 第一个节点的 y 坐标                                      |
| xstep     | number  | 120     | 相邻两个节点之间 x 轴上的间隔                            |
| ystep     | number  | 50      | 相邻两个节点 y 轴上的间隔                                |
| data      | Array   | []      | 节点数据                                                 |
| lineStyle | string  | default | 线型,目前支持三种不同的线型: ' default',' bessel','line' |
| showArrow | boolean | false   | 是否显示箭头                                             |
|           |         |         |                                                          |

### 各个节点的属性

| Name         | Type   | Default | Description                                                                          |
| ------------ | ------ | ------- | ------------------------------------------------------------------------------------ |
| name         | string | null    | 各节点的标题                                                                         |
| hint         | string | null    | 各个节点的提示                                                                       |
| status       | string | null    | 各个节点的状态,包括：`start`,`succeed`,`running`,`failure`,`paused`,`unstable`,`end` |
| next         | Array  | []      | 邻接表(表示与当前节点相连的节点的列表)                                               |
| next: index  | number | null    | 相邻节点的索引                                                                       |
| next: weight | number | null    | 权重(表现为不同的颜色)                                                               |

**范例:**

```javascript
let data = [
  {
    name: "Start",
    hint: "1m23s",
    status: "start",
    next: [{ index: 1, weight: 2 }]
  },
  {
    name: "Ammouncement Import",
    hint: "1m23s",
    status: "success",
    next: [
      { index: 2, weight: 0 },
      { index: 4, weight: 2 }
    ]
  },
  {
    name: "Employee ID to Onboarding",
    hint: "2m23s",
    status: "failure",
    next: [{ index: 3, weight: 0 }]
  },
  {
    name: "Personal Basic Info",
    hint: "2m23s",
    status: "paused",
    next: [{ index: 4, weight: 0 }]
  },
  { name: "End ", hint: "2m23s", status: "end", next: [] }
];
```

## 事件

| Name   | Params | Description            |
| ------ | ------ | ---------------------- |
| @click | node   | 当节点被点击的时候触发 |

## 方法

| Name   | params | Description                         |
| ------ | ------ | ----------------------------------- |
| render | Node   | 重新渲染整个图,当参数变化时可以调用 |

## Contributing

如果发现有任何 bug 或者建议,欢迎创建新的 issue 或者发 PR.

Thanks!

## 本地开发

```
cd demo
yarn install

// Compiles and hot-reloads for development
yarn run serve
```

### Lints and fixes files

```
yarn run lint
```
