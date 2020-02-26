# vue-pipeline

[![npm](https://img.shields.io/npm/v/vue-pipeline.svg)](https://www.npmjs.com/package/vue-pipeline)
[![npm](https://img.shields.io/npm/dt/vue-pipeline.svg)](https://www.npmjs.com/package/vue-pipeline)
[![GitHub stars](https://img.shields.io/github/stars/jinfang134/vue-pipeline.svg?style=social&label=Stars&style=for-the-badge)](https://github.com/jinfang134/vue-pipeline/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jinfang134/vue-pipeline.svg?style=social&label=Fork&style=for-the-badge)](https://github.com/jinfang134/vue-pipeline/network)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/jinfang134/vue-pipeline/blob/master/LICENSE)

One easy-to-use component to show beautiful responsive timeline like jenkins blue ocean plugin.

[中文](https://github.com/jinfang134/vue-pipeline/blob/master/docs/cn.md)

![sample](https://github.com/jinfang134/vue-pipeline/raw/master/resources/sample.png)

To get started, check out:

- [Demo](https://jinfang134.github.io/vue-pipeline/)

## LICENSE

**NOTE:** Vue Pipeline is licensed under [The MIT License](https://github.com/jinfang134/vue-pipeline/blob/master/LICENSE). Completely free, you can arbitrarily use and modify this plugin. If this plugin is useful to you, you can **Star** this repo, your support is my biggest motive force, thanks.

## Features

- Created Graph according your data dynamiclly
- Responsive web design
- svg component
- Fully configurable
- Via data attributes
- Show/Hide arrow
- 3 kinds of lines
- support graph and tree view
- Single node selection
- Different status for each node
- Different weight for each edge
- Different color for each node and edge

## Install

```
npm install vue-pipeline
```

```
import Vue from 'vue'
import VuePipeline from 'vue-pipeline'

Vue.use(VuePipeline)

```

## Props

### Props of Pipeline

| Name      | Type    | Default | Description                                            |
| --------- | ------- | ------- | ------------------------------------------------------ |
| x         | number  | 50      | The x coordinate of the starting point of the graph    |
| y         | number  | 55      | The y coordinate of the starting point of the graph    |
| xstep     | number  | 120     | The position horizontally from a previous node.        |
| ystep     | number  | 50      | The position vertically from a previous node.          |
| data      | Array   | []      | data                                                   |
| lineStyle | string  | default | There are 3 types of line: ' default',' bessel','line' |
| showArrow | boolean | false   | whether show arrow for each line.                      |
|           |         |         |                                                        |

### Props for each node

| Name         | Type   | Default | Description                                                                                                      |
| ------------ | ------ | ------- | ---------------------------------------------------------------------------------------------------------------- |
| name         | string | null    | The title of each node                                                                                           |
| hint         | string | null    | The hint of each node                                                                                            |
| status       | string | null    | Status of each node, There are 6 type of status: `start`,`succeed`,`running`,`failure`,`paused`,`unstable`,`end` |
| next         | Array  | []      | The edge connected with this node                                                                                |
| next: index  | number | null    | The index of another node of this edge                                                                           |
| next: weight | number | null    | The weight of this edge                                                                                          |

**Sample Data:**

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

## Events

| Name   | Params | Description                 |
| ------ | ------ | --------------------------- |
| @click | node   | Occurs when node is clicked |

## Function

| Name   | params | Description                  |
| ------ | ------ | ---------------------------- |
| render | Node   | render the whole graph again |

## Contributing

If you find any bugs and/or want to contribute, feel free to create issues or submit pull requests.

Thanks!

## Local Development

```
cd demo
yarn install

// Compiles and hot-reloads for development
yarn run serve
```

### publish a new version

```
npm version patch
npm version minor
npm version major
```

### Lints and fixes files

```
yarn run lint
```
