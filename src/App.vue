<template>
  <div id="app">
    <!-- <img
      alt="Vue logo"
      src="./assets/logo.png"
    > -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Pipeline />
    <hue/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Pipeline from "./components/Pipeline.vue";
import hue from './components/hue.vue'
export default {
  name: "app",
  components: {
    HelloWorld,
    Pipeline,
    hue
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
