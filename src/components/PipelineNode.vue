<template>
  <g :transform="'translate('+x+','+y+')'" :class="nodeClass">
    <text x="-20" y="-20" class="pipeline-node-label">{{label}}</text>
    <g class="svgResultStatus">
      <circle cx="0" cy="0" r="12" class="circle-bg success"></circle>
      <g class="result-status-glyph">
        <polygon points="-2.00 2.80 -4.80 0.00 -5.73 0.933 -2.00 4.67 6.00 -3.33 5.07 -4.27"></polygon>
      </g>
    </g>
    <title>{{hint}}</title>
    <circle r="19" class="pipeline-node-hittarget" fill-opacity="0" stroke="none" cursor="pointer" @click="handleClick">
    </circle>
    <g class="pipeline-selection-highlight" v-if="selected">
      <circle class="white-highlight" r="13" stroke-width="10"></circle>
      <circle r="15" stroke-width="2"></circle>
    </g>

  </g>
</template>
<script>
export default {
  props: {
    hint: {
      type: String
    },
    status: {
      type: Boolean
    },
    label: {
      type: String
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    node: {
      type: Object
    },
    selected: {
      type: Boolean
    }
  },
  data() {
    return {
      nodeClass: "pipeline-node"
    };
  },
  methods: {
    handleClick() {
      // eslint-disable-next-line no-console
      console.log("click", this.node);
      this.nodeClass = "pipeline-node-selected";
      this.selected = true;
      this.$emit("click", this.node);
    },
    getTextWidth(text, font) {
      // re-use canvas object for better performance
      var canvas =
        this.getTextWidth.canvas ||
        (this.getTextWidth.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return metrics.width;
    }
  }
};
</script>
<style lang="css">
.pipeline-node-label {
  font: 12px sans-serif;
  font-size: 12px;
  /* fill: red; */
  width: 100px;
  overflow: hidden;
  overflow-wrap: break-word;
  /* top: 140px; */
  /* left: 339px; */
  position: absolute;
  width: 89px;
  /* max-height: 39px; */
  text-align: center;
}
</style>
