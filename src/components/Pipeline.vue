
<template>
  <div class="PipelineGraph" style="position: relative; overflow: visible;">
    <svg width="1248" height="350">

      <g transform="translate(60,55)" class="pipeline-node">
        <circle r="7" class="pipeline-node-terminal"></circle>
        <circle r="19" class="pipeline-node-hittarget" fill-opacity="0" stroke="none"></circle>
      </g>

      <pipeline-node v-for="(item,idx) in nodeList" :key="'node'+idx" hint="test hint" :status="item.status"
        :label="item.name" :x="item.x" :y="item.y" :node="item" />
      <pipeline-line v-for="(item,index) in lineList" :key="'line'+index" :x1="item.x1" :y1="item.y1" :x2="item.x2"
        :y2="item.y2" />

      <!-- <g transform="translate(900,55)" class="pipeline-node">
        <circle r="7" class="pipeline-node-terminal"></circle>
        <circle r="19" class="pipeline-node-hittarget" fill-opacity="0" stroke="none"></circle>
      </g> -->
    </svg>

  </div>
</template>
<script>
import PipelineNode from "./PipelineNode";
import PipelineLine from "./PipelineLine";
import data from "./data.js";
export default {
  components: {
    PipelineNode,
    PipelineLine
  },
  props: {
    y: {
      type: Number,
      default: 55
    },
    xstep: {
      type: Number,
      default: 150
    },
    ystep: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      data: data,
      nodeList: [],
      lineList: []
    };
  },
  methods: {
    getLines() {
      let matrix = this.data.matrix;
      for (let i = 0; i < matrix.length; i++) {
        let node = this.data.nodes[i];
        for (let j = i; j < matrix[i].length; j++) {
          if (matrix[i][j] == 1) {
            let child = this.data.nodes[j];
            this.lineList.push({
              x1: node.x,
              y1: node.y,
              x2: child.x,
              y2: child.y
            });
          }
        }
      }
      // eslint-disable-next-line no-console
      console.log(this.lineList);
    },
    // 优化节点的位置
    optimize() {
      for (let i = 0; i < this.nodeList.length; i++) {
        let node = this.nodeList[i];
        if (node.y == this.y) {
          // 第一行不变
          continue;
        }
        let parents = this.findParents(node.index);
        let children = this.findChildren(node.index);
        // eslint-disable-next-line no-console
        console.log(parents, children);
        let startx = Math.max(...parents.map(item => this.nodeList[item].x));
        let endx = Math.min(...children.map(item => this.nodeList[item].x));
        node.x = (startx + endx) / 2;
        this.nodeList[node.index] = node;
      }
    },
    findParents(index) {
      let arr = [];
      let matrix = this.data.matrix;
      for (let i = 0; i < this.data.matrix.length; i++) {
        if (matrix[i][index] == 1) {
          arr.push(i);
        }
      }
      return arr;
    },
    // 查找子节点
    findChildren(index) {
      let arr = [];
      let matrix = this.data.matrix;
      for (let i = 0; i < matrix[index].length; i++) {
        if (matrix[index][i] == 1) {
          arr.push(i);
        }
      }
      return arr;
    },
    bfs(index, x) {
      const matrix = this.data.matrix;
      const queue = [];
      let node = this.data.nodes[index];
      node.x = x;
      node.y = this.y;
      node.index = index;
      queue.push(node);
      this.nodeList[index] = node;
      while (queue.length > 0) {
        let first = queue.shift();
        let y = this.y;
        for (let i = 0; i < matrix[first.index].length; i++) {
          if (matrix[first.index][i] == 1) {
            let child = this.data.nodes[i];
            if (this.nodeList[i]) {
              child.x = Math.max(first.x + this.xstep, this.nodeList[i].x);
            } else {
              child.x = first.x + this.xstep;
            }
            child.y = y;
            child.index = i;
            y += this.ystep;
            queue.push(child);
            this.nodeList[i] = child;
          }
        }
      }
      // eslint-disable-next-line no-console
      console.log("node list", this.nodeList);
    }
  },
  mounted() {
    this.bfs(0, 265);
    for (let i = 0; i < this.data.matrix.length; i++) {
      if (!this.nodeList[i]) {
        // if this is independent node, append it to the tail.
        let maxX = Math.max(...this.nodeList.map(it => it.x));
        this.bfs(i, maxX + this.xstep);
      }
    }
    this.optimize();
    this.getLines();
  }
};
</script>

<style >
.pipeline-node-terminal {
  fill: #949393;
}
.pipeline-connector-skipped {
  stroke: #949393;
  stroke-opacity: 0.25;
}
.pipeline-small-label {
  font-size: 80%;
}
.pipeline-big-label.selected,
.pipeline-small-label.selected {
  font-weight: bold;
}
.pipeline-selection-highlight circle {
  fill: none;
  stroke: #4a90e2;
}
.pipeline-selection-highlight circle.white-highlight {
  stroke: white;
}

.pipeline-node-terminal {
  fill: #949393;
}
.svgResultStatus.no-background .circle-bg {
  opacity: 0;
}

.jdl-table td .svgResultStatus {
  vertical-align: middle;
}

.pipeline-big-label.selected,
.pipeline-small-label.selected {
  font-weight: bold;
}
</style>