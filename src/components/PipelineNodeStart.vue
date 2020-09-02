<template>
  <g class="pipeline-node-start">
    <!-- <rect rx="13" id="svg_1" height="26" width="40" y="-13" x="-20" stroke-width="1.5" /> -->
    <circle cx="0" cy="0" r="12" id="svg_1"></circle>
    <text id="svg_2" x="-15" y="-20" class="pipeline-node-start__text">{{label}}</text>
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
  font-weight: bold;
}
</style>
