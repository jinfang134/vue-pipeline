
<template>
  <svg class="pipeline" :viewBox="viewbox" preserveAspectRatio="xMinYMin meet">
    <defs>
      <marker
        refX="13"
        refY="10"
        orient="auto"
        markerWidth="3"
        :key="'arrow'+i"
        :id="'idArrow'+i"
        markerHeight="10"
        :class="'weight'+i"
        viewBox="0 0 20 20"
        markerUnits="strokeWidth"
        v-for="i in [0,1,2,3,4,5]"
      >
        <path d="M 0 0 L 20 10 L 0 20 z"/>
      </marker>
    </defs>

    <pipeline-line
      :path="item.path"
      :key="'line'+index"
      :weight="item.weight"
      :showArrow="showArrow"
      :lineStyle="lineStyle"
      v-for="(item,index) in lineList"
    />
    <pipeline-node
      :x="item.x"
      :y="item.y"
      :node="item"
      :index="idx"
      :key="'node'+idx"
      :tool="item.tool"
      :hint="item.hint"
      :label="item.name"
      :count="item.count"
      @click="handleClick"
      :status="item.status"
      :selected="selectedList[idx]"
      v-for="(item,idx) in nodeList"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />
  </svg>
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
    // Starting Point in X axis
    x: {
      type: Number,
      default: 50
    },
    // Starting Point in y axis
    y: {
      type: Number,
      default: 55
    },
    // Gap between nodes in x axis
    xstep: {
      type: Number,
      default: 120
    },
    // Gap between nodes in y axis
    ystep: {
      type: Number,
      default: 80
    },
    data: {
      type: Array,
      default: () => []
    },
    lineStyle: {
      type: String,
      default: "default"
    },
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      width: 300,
      height: 300,
      service: {},
      nodeList: [],
      lineList: [],
      selectedList: [],
      viewbox: '0 0 0 0'
    };
  },
  computed: {
    dataLength() {
      return this.data.length;
    }
  },
  watch: {
    dataLength() {
      this.render();
    }
  },
  methods: {
    handleClick(index, node) {
      this.selectedList.fill(false, 0, this.nodeList.length);
      this.$set(this.selectedList, index, true);
      this.selectedList[index] = true;
      this.$emit("select", node);
    },
    handleMouseEnter(index, node) {
      this.$emit("mouseenter", node);
    },
    handleMouseLeave(index, node) {
      this.$emit("mouseleave", node);
    },
    render() {
      this.service = new Pipeline(
        this.data,
        this.x,
        this.y,
        this.xstep,
        this.ystep,
        this.lineStyle
      );
      if (this.service.hasCircle()) {
        throw new Error("Error data, The graph should not contain any circle!");
      }
      this.service.calculateAllPosition();
      this.service.optimize();
      this.nodeList = this.service.nodes;
      this.lineList = this.service.getLines();
      this.width = this.service.width;
      this.height = this.service.height;
      this.viewbox = `0 0 ${this.width} ${this.height}`;
    }
  },
  mounted() {
    this.render();
    this.selectedList.fill(false, 0, this.nodeList.length);
  }
};
</script>

<style >
.pipeline {
  /* transform: rotate(90deg) */
}

.pipeline .weight0 {
  fill: #ddd;
  stroke: #ddd;
}

.pipeline .weight1 {
  fill: #949393;
  stroke: #949393;
}

.pipeline .weight2 {
  fill: #8cc04f;
  stroke: #8cc04f;
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
