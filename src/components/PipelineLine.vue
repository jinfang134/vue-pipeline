<template>
  <g>
    <path stroke-width="3.5" :stroke="color()" :d="this.path" fill="none"> </path>
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
    }
  },
  data() {
    return {
      ystep: this.y1 + 30
    };
  },
  computed: {},
  methods: {
    color() {
      switch (this.weight) {
        case 0:
          return "#ddd";
        case 1:
          return "#949393";
        case 2:
          return "#8cc04f";
        default:
          break;
      }
    }
  }
};
</script>
<style lang="css">
.pipeline-connector {
  stroke: #949393;
}
</style>
