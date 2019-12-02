# vue-pipeline

One easy-to-use component to show beautiful responsive timeline like jenkins blue ocean plugin.

[中文](/doc/cn.md)

![sample](./resources/sample.png)

To get started, check out:

* [Docs](https://bootstrap-table.com)
* [Demo]()


## LICENSE

**NOTE:** Vue Pipeline is licensed under [The MIT License](https://github.com/jinfang134/vue-pipeline/blob/master/LICENSE). Completely free, you can arbitrarily use and modify this plugin. If this plugin is useful to you, you can **Star** this repo, your support is my biggest motive force, thanks.


## Features

* Created Graph according your data dynamiclly
* Responsive web design
* svg component
* Fully configurable
* Via data attributes
* Show/Hide arrow
* 3 kinds of lines
* support graph and tree view
* Single node selection
* Different status for each node
* Different weight for each edge
* Different color for each node and edge


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

| Name      | Type    | Default | Description                                          |
| --------- | ------- | ------- | ---------------------------------------------------- |
| width     | Number  | 1280    | The width of whole graph                             |
| height    | number  | 600     | Height                                               |
| x         | number  | 50      | start position of first node                         |
| y         | number  | 55      | The y value of first line                            |
| xstep     | number  | 120     | The padding of two node                              |
| ystep     | number  | 50      |                                                      |
| data      | Array   | []      | data                                                 |
| lineStyle | string  | default | There are 3 type of line:' default',' bessel','line' |
| showArrow | boolean | false   | whether show arrow for each line.                    |
|           |         |         |                                                      |

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


### Lints and fixes files
```
yarn run lint
```
