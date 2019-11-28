<template>
  <div id="app">
    <!-- <img
      alt="Vue logo"
      src="./assets/logo.png"
    > -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    {{msg}}
    <Pipeline :data="data.hue1.nodes" :height="400" :xstep="140" @select="handleSelect" />
    <Pipeline :data="data.hue3.nodes" :height="150" :xstep="160" @select="handleSelect" />
    <Pipeline :data="data.sample.nodes" :height="300" @select="handleSelect" />
    <hue />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Pipeline from "./components/Pipeline.vue";
import hue from "./components/hue.vue";
import data from "./components/data.js";

export default {
  name: "app",
  components: {
    Pipeline,
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
/* html,body{
  height:98vh;
  overflow: scroll;
  margin: 0px;
  padding:0px;
} */
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
