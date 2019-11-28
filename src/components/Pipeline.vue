
<template>
  <div class="PipelineGraph" style="position: relative; overflow: visible;">
    <svg width="1248" height="550">
      <!-- start node -->
      <!-- <g transform="translate(60,55)" class="pipeline-node">
        <circle r="7" class="pipeline-node-terminal"></circle>
        <circle r="19" class="pipeline-node-hittarget" fill-opacity="0" stroke="none"></circle>
      </g> -->

      <pipeline-line v-for="(item,index) in lineList" :key="'line'+index" :x1="item.x1" :y1="item.y1" :x2="item.x2"
        :y2="item.y2" :xstep="xstep" :weight="item.weight" />
      <pipeline-node v-for="(item,idx) in nodeList" :key="'node'+idx" :hint="item.hint" :status="item.status"
        :label="item.name" :x="item.x" :y="item.y" :node="item" />

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
    //第一个点的y座标
    y: {
      type: Number,
      default: 55
    },
    // x轴上相邻两个点之间的距离
    xstep: {
      type: Number,
      default: 120
    },
    // y 轴上相邻两个点之间的距离
    ystep: {
      type: Number,
      default: 50
    },
    // 第一个点的起始位置
    xstart: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
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
  methods: {},
  mounted() {
    this.service = new Pipeline(
      data.nodes,
      this.xstart,
      this.y,
      this.xstep,
      this.ystep
    );
    this.service.calculateAllPosition();
    // this.service.optimize();
    this.nodeList = this.service.nodes;
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