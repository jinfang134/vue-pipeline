<template>
  <g :class="'pipeline-line '+'weight'+weight ">
    <path stroke-width="3.5" :d="path" fill="none" :marker-end="getMarkerEnd()"> </path>
  </g>
</template>

<script>
export default {
  props: {
    path: {
      type: String
    },
    weight: {
      type: Number,
      default: 0
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    ystep: {
      type: Number,
      default: 30
    }
  },
  setup (props) {
    const getMarkerEnd = () => {
      if (props.showArrow) {
        return `url(#idArrow${props.weight})`
      }
    }
    const color = () => {
      if (props.weight < 3) {
        return ['#ddd', '#949393', '#8cc04f'][props.weight]
      }
    }
    return {
      getMarkerEnd, color
    }
  }
}
</script>
<style lang="css">
.pipeline-connector {
  stroke: #949393;
}
</style>
