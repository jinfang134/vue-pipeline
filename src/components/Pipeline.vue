
<template>
  <div class="PipelineGraph" style="position: relative; overflow: visible;">
    <svg width="1248" height="350">
      <!-- start node -->
      <!-- <g transform="translate(60,55)" class="pipeline-node">
        <circle r="7" class="pipeline-node-terminal"></circle>
        <circle r="19" class="pipeline-node-hittarget" fill-opacity="0" stroke="none"></circle>
      </g> -->

      <pipeline-node v-for="(item,idx) in nodeList" :key="'node'+idx" hint="test hint" :status="item.status"
        :label="item.name" :x="item.x" :y="item.y" :node="item" />
      <pipeline-line v-for="(item,index) in lineList" :key="'line'+index" :x1="item.x1" :y1="item.y1" :x2="item.x2"
        :y2="item.y2" :xstep="xstep" />

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
      default: 120
    },
    ystep: {
      type: Number,
      default: 50
    },
    xstart: {
      type: Number,
      default: 50
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
    checkCircle() {},
    getLines() {
      for (let i = 0; i < this.data.nodes.length; i++) {
        let node = this.data.nodes[i];
        if (!node.next) {
          continue;
        }
        for (let j = 0; j < node.next.length; j++) {
          let childIndex = node.next[j];
          let child = this.data.nodes[childIndex];
          this.lineList.push({
            x1: node.x,
            y1: node.y,
            x2: child.x,
            y2: child.y
          });
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
      for (let i = 0; i < this.data.nodes.length; i++) {
        if (
          this.data.nodes[i].next &&
          this.data.nodes[i].next.includes(index)
        ) {
          arr.push(i);
        }
      }
      return arr;
    },
    // 查找子节点
    findChildren(index) {
      return this.data.nodes[index].next || [];
    },
    // from the (index)th node to bfs, set the x coordinate of the first to x
    bfs(index, x) {
      const queue = [];
      const visited = [];
      let xlist = []; //在当前x坐标上的y坐标列表, 如{120:70,240:80}
      let node = this.data.nodes[index];
      node.x = x;
      node.y = this.y;
      node.index = index;
      queue.push(node);
      this.nodeList[index] = node;
      while (queue.length > 0) {
        let first = queue.shift();
        let y = this.y;
        visited[first.index] = true;
        if (!first.next) {
          continue;
        }
        for (let i = 0; i < first.next.length; i++) {
          let childIndex = first.next[i];
          let child = this.data.nodes[childIndex];
          if (visited[childIndex] == true) {
            //已经有坐标,则更新坐标
            child.x = Math.max(
              first.x + this.xstep,
              this.nodeList[childIndex].x
            );
            console.log(childIndex, child.x, this.nodeList[childIndex].x);
            continue;
          }
          child.x = first.x + this.xstep;
          child.y = y;
          y += this.ystep;
          child.index = childIndex;
          queue.push(child);
          //   visited[childIndex] = true;
          this.nodeList[childIndex] = child;
        }
        console.log(xlist);
      }
      // eslint-disable-next-line no-console
      console.log("node list", this.nodeList);
    }
  },
  mounted() {
    this.bfs(0, this.xstart);
    for (let i = 0; i < this.data.nodes.length; i++) {
      if (!this.nodeList[i]) {
        // if this is independent node, append it to the tail.
        let maxX = Math.max(...this.nodeList.map(it => it.x));
        this.bfs(i, maxX + this.xstep);
      }
    }
    // this.optimize();
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