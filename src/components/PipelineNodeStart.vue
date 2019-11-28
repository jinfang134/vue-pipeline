<template>
  <g class="pipeline-node-start">
    <ellipse ry="10" rx="20" id="svg_1" stroke-width="1.5" />
    <text id="svg_2" x="-12" y="3" class="pipeline-node-start__text">{{label}}</text>
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
.pipeline-node-start {
  stroke: none;
  fill: #8cc04f;
}

.pipeline-node-start__text {
  stroke: none;
  fill: #fff;
  font-size: 12px;
}
</style>