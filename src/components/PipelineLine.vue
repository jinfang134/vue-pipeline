<template>
  <g>
    <path v-if="y1!=y2" stroke-width="3.5" stroke="#949393" :d="getPath()" fill="none"> </path>
    <line v-if="y1==y2" class="pipeline-connector" stroke-width="3.5" :x1="x1+10" :y1="y1" :x2="x2-10" :y2="y2" ></line>
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
    }
  },
  data() {
    return {};
  },
  methods: {
    getPath() {
      const lb = "c 0 12 12 12 12 12";
      const rb = "c 12 0 12 -12 12 -12";
      const rt = "c 12 0 12 12 12 12";
      const lt = "c 0 -12 12 -12 12 -12";
      let mid = (this.x2 - this.x1) / 2 - 24;
      let midy = Math.abs(this.y2 - this.y1);
      if (this.y2 > this.y1) {
        // 左上到右下
        const d = `M ${this.x1 + 10} ${this.y1}\
            l ${mid} 0\
            ${rt} \
            l 0 ${midy-24} \
            ${lb} \
            l ${mid} 0
        `;
        return d;
      } else {
        const d = `M ${this.x1 + 10} ${this.y1}\
            l ${mid} 0\
            ${rb} \
            l 0 -${midy-24} \
            ${lt} \
            l ${mid-60} 0
        `;
        return d;
      }

      //   return pathData;
    }
  }
};
</script>