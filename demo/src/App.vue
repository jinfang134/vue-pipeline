<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    {{msg}}
    <div class="setting">

      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Width">
              <el-input v-model="form.width"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="Height">
              <el-input v-model="form.height"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="X step">
              <el-input v-model="form.xstep"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="Y step">
              <el-input v-model="form.ystep"></el-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-form-item label="Show Arrow">
          <el-switch v-model="form.showArrow"></el-switch>
        </el-form-item>

        <el-form-item label="Line Style">
          <el-radio-group v-model="form.lineStyle">
            <el-radio label="default">Default</el-radio>
            <el-radio label="bessel">Bessel</el-radio>
            <el-radio label="line">line</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Samples">
          <el-radio-group v-model="form.data">
            <el-radio :label="0">Sample 1 </el-radio>
            <el-radio :label="1">Sample 2</el-radio>
            <el-radio :label="2">Sample 3</el-radio>
            <el-radio :label="3">Sample 4</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
      </el-form>
    </div>

    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="Pipeline" name="pipeline">
        <vue-pipeline :data="getData()" :width="form.width" :showArrow="form.showArrow" :height="form.height"
          :ystep="form.ystep" :xstep="form.xstep" :lineStyle="form.lineStyle" @select="handleSelect" />
      </el-tab-pane>
      <el-tab-pane label="Data" name="data">
        {{JSON.stringify(this.getData())}}
      </el-tab-pane>

    </el-tabs>

    <div>
    </div>
    <!-- <hue /> -->
  </div>
</template>

<script>
import hue from "./hue.vue";
import { hue1, hue3, sample, sample3 } from "./data.js";

export default {
  name: "app",
  components: {
    hue
  },
  data() {
    return {
      tab: "pipeline",
      form: {
        height: 800,
        width: 800,
        xstep: 120,
        ystep: 70,
        data: 0,
        showArrow: true,
        lineStyle: "default",
        desc: ""
      },
      msg: ""
      // data: data
    };
  },
  methods: {
    getData() {
      console.log(this.form.data);
      switch (this.form.data) {
        case 0:
          return hue1.nodes;
        case 1:
          return hue3.nodes;
        case 2:
          return sample.nodes;
        case 3:
          return sample3.nodes;
      }
    },
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
.setting {
  margin: 30px;
}
</style>
