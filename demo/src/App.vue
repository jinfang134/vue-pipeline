<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    {{msg}}
    <div>
      <vue-pipeline :data="data.hue1.nodes" :width="800" :height="700" :ystep="80" :xstep="140"
        @select="handleSelect" />
    </div>
    <!-- <div><vue-pipeline :data="data.hue3.nodes" :height="150" :xstep="160" @select="handleSelect" /></div>
    <div><vue-pipeline :data="data.sample.nodes" :height="400" @select="handleSelect" /></div>
    <div><vue-pipeline :data="data.sample3.nodes" :height="400" @select="handleSelect" /></div> -->
    <hue />
  </div>
</template>

<script>
import hue from "./hue.vue";
import data from "./data.js";

export default {
  name: "app",
  components: {
    hue
  },
  data() {
    return {
      msg: "",
      data: data
    };
  },
  methods: {
    handleSelect(node) {
      // alert(`you selected { ${node.name} }`);
      this.msg = `you selected { ${node.name} }`;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  /* height: 100vh; */
  /* display: flex; */
  /* flex-direction: column; */
}
</style>
