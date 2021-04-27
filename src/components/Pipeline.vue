<template>
  <svg class="pipeline" :width="width" :height="height">
    <defs>
      <marker :id="'idArrow'+i" v-for="i in [0,1,2,3,4,5]" :key="'arrow'+i" :class="'weight'+i" viewBox="0 0 20 20"
        refX="13" refY="10" markerUnits="strokeWidth" markerWidth="3" markerHeight="10" orient="auto">
        <path d="M 0 0 L 20 10 L 0 20 z" />
      </marker>
    </defs>

    <pipeline-line v-for="(item,index) in lineList" :key="'line'+index" :showArrow="showArrow" :path="item.path"
      :weight="item.weight" :lineStyle="lineStyle" :ystep="ystep"/>
    <pipeline-node v-for="(item,idx) in nodeList" :key="'node'+idx" :hint="item.hint" :status="item.status"
      :label="item.name" :x="item.x" :y="item.y" :node="item" :index="idx" :selected="selectedList[idx]"
      @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"/>
  </svg>
</template>
<script>
import PipelineNode from './PipelineNode'
import PipelineLine from './PipelineLine'
import { Pipeline } from './service'
import { onMounted, ref, reactive, computed, watch } from 'vue'

export default {
  components: {
    PipelineNode,
    PipelineLine
  },
  props: {
    // 第一个点的起始位置
    x: {
      type: Number,
      default: 50
    },
    // 第一个点的y座标
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
    data: {
      type: Array,
      default: () => []
    },
    lineStyle: {
      type: String,
      default: 'default'
    },
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select', 'mouseenter', 'mouseleave'],
  setup (props, { emit }) {
    const nodeList = ref([])
    const width = ref(300)
    const height = ref(300)
    const lineList = ref([])
    const selectedList = ref([])
    let service = reactive({})
    const dataLength = computed(() => props.data.length)
    const handleClick = (index, node) => {
      selectedList.value.fill(false, 0, nodeList.value.length)
      selectedList.value[index] = true
      emit('select', node)
    }
    const handleMouseEnter = (index, node) => {
      emit('mouseenter', node)
    }
    const handleMouseLeave = (index, node) => {
      emit('mouseleave', node)
    }
    const render = () => {
      console.log('data: ', props.data)
      service = new Pipeline(
        props.data,
        props.x,
        props.y,
        props.xstep,
        props.ystep,
        props.lineStyle
      )
      if (service.hasCircle()) {
        throw new Error('Error data, The graph should not contain any circle!')
      }
      service.calculateAllPosition()
      // this.service.optimize();
      nodeList.value = service.nodes
      lineList.value = service.getLines()
      width.value = service.width
      height.value = service.height
    }
    watch(dataLength, () => {
      render()
    })
    onMounted(() => {
      render()
      selectedList.value.fill(false, 0, nodeList.value.length)
    })
    return {
      nodeList, width, height, lineList, selectedList, service, dataLength, handleClick, render, handleMouseLeave, handleMouseEnter
    }
  }
}
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
