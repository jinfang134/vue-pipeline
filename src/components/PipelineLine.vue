<template>
  <g>
    <path v-if="y1!=y2" stroke-width="3.5" :stroke="color()" :d="getPath()" fill="none"> </path>
    <line v-if="y1==y2&&x2-x1==xstep" :stroke="color()" stroke-width="3.5" :x1="x1+10" :y1="y1" :x2="x2-10" :y2="y2">
    </line>
    <path v-if="y1==y2&&x2-x1>xstep" stroke-width="3.5" :stroke="color()" :d="getPath2()" fill="none"> </path>

  </g>
</template>

<script>
export default {
  props: {
    x1: {
      type: Number
    },
    y1: {
      type: Number
    },
    x2: {
      type: Number
    },
    y2: {
      type: Number
    },
    xstep: {
      type: Number
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
    },
    getPath2() {
      let start = this.x1 + 10;
      let number = parseInt((this.x2 - this.x1) / this.xstep);

      let control1 = this.xstep / 2 + 40;
      let control2 = this.xstep / 2 + 30;

      let d = `M ${start} ${this.y1} \
          l 20 0\
         C ${this.x1 + control1},${this.y1} \
          ${this.x1 + control2},${this.ystep} \
           ${this.x1 + this.xstep},${this.ystep}`;
      if (number > 2) {
        d += `l ${this.xstep * (number - 2)} 0`;
      }

      d += `C ${this.x2 - control2},${this.ystep} \
      ${this.x2 - control1},${this.y1} \
      ${this.x2 - 10 - 20},${this.y2} \
      l 20 0`;

      // const d = `M ${this.x1 + 10} ${this.y1}\
      //       S ${this.x1 + 120} ${this.y1 + 100} ${this.x2 - 10} ${this.y2}
      //   `;
      console.log(d);
      return d;
    },
    getPath() {
      const lb = "c 0 12 12 12 12 12";
      const rb = "c 12 0 12 -12 12 -12";
      const rt = "c 12 0 12 12 12 12";
      const lt = "c 0 -12 12 -12 12 -12";
      let midy = Math.abs(this.y2 - this.y1);
      if (this.y2 > this.y1) {
        // 左上到右下
        let firstCorner = this.x2 - this.x1 - 50;
        const d = `M ${this.x1 + 10} ${this.y1}\
            l ${20} 0\
            ${rt} \
            l 0 ${midy - 24} \
            ${lb} \
            l ${firstCorner - 20} 0
        `;
        return d;
      } else {
        // 左下到右上
        let lastCorner = this.x2 - this.x1 - 50;
        const d = `M ${this.x1 + 14} ${this.y1}\
            l ${lastCorner - 20} 0\
            ${rb} \
            l 0 -${midy - 24} \
            ${lt} \
            l ${20} 0
        `;
        // console.log(d)
        return d;
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