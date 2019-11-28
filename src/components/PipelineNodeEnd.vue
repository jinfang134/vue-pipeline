<template>
  <g class="pipeline-node-end">
    <circle cx="0" cy="0" r="12" class="circle-end"></circle>
    <text id="svg_2" x="16" y="4" class="pipeline-node-end__text">{{label}}</text>
  </g>
</template>
<script>
export default {
  props: {
    label: {
      type: String
    }
  }
};
</script>

<style lang="css">
.pipeline-node-end .circle-end {
  stroke: none;
  fill: #aaa;
}

.pipeline-node-end__text {
  stroke: none;
  fill: #333;
  font-size: 12px;
}
</style>