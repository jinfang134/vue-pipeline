<template>
  <g :transform="'translate('+x+','+y+')'" :class="nodeClass">
    <text x="-20" y="-20" class="pipeline-node-label">{{label}}</text>
    <g class="svgResultStatus">
      <circle cx="0" cy="0" r="12" :class="'circle-bg '+status"></circle>
      <g class="result-status-glyph">
        <polygon fill="white" v-if="status=='failure'"
          points="4.67 -3.73 3.73 -4.67 0 -0.94 -3.73 -4.67 -4.67 -3.73 -0.94 0 -4.67 3.73 -3.73 4.67 0 0.94 3.73 4.67 4.67 3.73 0.94 0">
        </polygon>
      </g>
      <g class="result-status-glyph" v-if="status=='success'">
        <polygon fill="white" points="-2.00 2.80 -4.80 0.00 -5.73 0.933 -2.00 4.67 6.00 -3.33 5.07 -4.27">
        </polygon>
      </g>
      <g class="result-status-glyph" v-if="status=='paused'">
        <polygon points="-4,-4.65 -4,4.65 -4,4.65 -1.5,4.65 -1.5,-4.65" />
        <polygon points="4,-4.65 1.5,-4.65 1.5,-4.65 1.5,4.65 4,4.65" />
      </g>
      <g class="result-status-glyph" v-if="status=='unstable'">
        <polygon points="-1 -5 1 -5 1 1 -1 1" />
        <polygon points="-1 3 1 3 1 5 -1 5" />
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
      type: String
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
      // this.selected = true;
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
.pipeline-node-selected .svgResultStatus > circle {
  stroke: none;
}

.svgResultStatus {
  transform: translateZ(0);
}
.svgResultStatus > circle {
  stroke: white;
  stroke-width: 2px;
}
.svgResultStatus > circle.success {
  fill: #8cc04f;
}
.svgResultStatus > circle.failure {
  fill: #d54c53;
}
.svgResultStatus > circle.unstable {
  fill: #f6b44b;
}
.svgResultStatus > circle.aborted {
  fill: #949393;
}
.svgResultStatus > circle.paused {
  fill: #24b0d5;
}
.svgResultStatus > circle.unknown {
  fill: #d54cc4;
}
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