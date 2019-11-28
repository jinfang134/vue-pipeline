
<template>
  <div class="PipelineGraph" style="position: relative; overflow: visible;">
    <svg width="1248" height="550">
      <!-- start node -->
      <!-- <g transform="translate(60,55)" class="pipeline-node">
        <circle r="7" class="pipeline-node-terminal"></circle>
        <circle r="19" class="pipeline-node-hittarget" fill-opacity="0" stroke="none"></circle>
      </g> -->

      <pipeline-node v-for="(item,idx) in nodeList" :key="'node'+idx" hint="test hint" :status="item.status"
        :label="item.name" :x="item.x" :y="item.y" :node="item" />
      <pipeline-line v-for="(item,index) in lineList" :key="'line'+index" :x1="item.x1" :y1="item.y1" :x2="item.x2"
        :y2="item.y2" :xstep="xstep" :weight="item.weight" />

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
import { Pipeline } from "./service";

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
      lineList: [],
      service: new Pipeline(
        data.nodes,
        0,
        this.xstart,
        55,
        this.xstep,
        this.ystep
      )
    };
  },
  methods: {
    checkCircle() {},

    // 优化节点的位置
    optimize() {
      for (let i = 0; i < this.nodeList.length; i++) {
        let node = this.nodeList[i];
        if (node.y == this.y) {
          // 第一行不变
          continue;
        }
        let parents = this.findParents(i);
        let children = this.findChildren(i);
        // eslint-disable-next-line no-console
        console.log(parents, children);
        let startx = Math.max(...parents.map(item => this.nodeList[item].x));
        let endx = Math.min(...children.map(item => this.nodeList[item].x));
        node.x = (startx + endx) / 2;
        this.nodeList[i] = node;
      }
    },
  
  },
  mounted() {
    this.service = new Pipeline(
      data.nodes,
      0,
      this.xstart,
      55,
      this.xstep,
      this.ystep
    );
    this.service.calculateAllPosition();
    this.data.nodes = this.service.nodes;
    this.nodeList = this.service.nodes;
    // console.log(this.nodeList);
    // this.optimize();
    this.lineList = this.service.getLines();
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