
<template>
  <!-- <div class="PipelineGraph" style="position: relative; overflow: visible;"> -->
  <svg class="pipeline" :width="width" :height="height">

    <pipeline-line v-for="(item,index) in lineList" :key="'line'+index" :path="item.path" :weight="item.weight"
      :lineStyle="lineStyle" />
    <pipeline-node v-for="(item,idx) in nodeList" :key="'node'+idx" :hint="item.hint" :status="item.status"
      :label="item.name" :x="item.x" :y="item.y" :node="item" :index="idx" :selected="selectedList[idx]"
      @click="handleClick" />

  </svg>

  <!-- </div> -->
</template>
<script>
import PipelineNode from "./PipelineNode";
import PipelineLine from "./PipelineLine";
import { Pipeline } from "./service";

export default {
  components: {
    PipelineNode,
    PipelineLine
  },
  props: {
    width: {
      type: Number,
      default: 1280
    },
    height: {
      type: Number,
      default: 200
    },
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
    },
    data: {
      type: Array,
      default: () => []
    },
    lineStyle: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      nodeList: [],
      lineList: [],
      selectedList: [],
      service: {}
    };
  },
  methods: {
    handleClick(index, node) {
      console.log(index, node);
      this.selectedList.fill(false, 0, this.nodeList.length);
      this.$set(this.selectedList, index, true);
      this.selectedList[index] = true;
      this.$emit("select", node);
    }
  },
  mounted() {
    this.service = new Pipeline(
      this.data,
      this.xstart,
      this.y,
      this.xstep,
      this.ystep,
      this.lineStyle
    );
    this.service.calculateAllPosition();
    // this.service.optimize();
    this.nodeList = this.service.nodes;
    this.lineList = this.service.getLines();
    this.selectedList.fill(false, 0, this.nodeList.length);
  }
};
</script>

<style >
.pipeline {
  /* transform: rotate(90deg) */
}
/* .pipeline .pipeline-node{
  transform: rotate(90deg)
} */
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
