<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <h2>Vue Pipeline</h2>

    <div class="setting">

      <el-form ref="form" :model="form" label-width="100px" @validate="fresh">
        <el-row>
          <el-col :span="12">
            <el-form-item label="x">
              <el-input v-model="form.x"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="y">
              <el-input v-model="form.y"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="X step">
              <el-input v-model="form.xstep" type="number"></el-input>
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
          <el-radio-group v-model="form.lineStyle" @change="fresh">
            <el-radio label="default">Default</el-radio>
            <el-radio label="bessel">Bessel</el-radio>
            <el-radio label="line">line</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Samples">
          <el-radio-group v-model="form.data" @input="fresh">
            <el-radio :label="0">Sample 1 </el-radio>
            <el-radio :label="1">Sample 2</el-radio>
            <el-radio :label="2">Sample 3</el-radio>
            <el-radio :label="3">Sample 4</el-radio>
            <el-radio :label="4">Sample 5</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Add Line">
          <div class="addline">
            <el-input v-model="form.from" hint="from"></el-input>
            <el-input v-model="form.to"></el-input>
            <el-button type="primary" @click="addLine">Add</el-button>
          </div>
        </el-form-item>
       <el-form-item label="">
          <el-button type="primary" @click="fresh">Update</el-button>
       </el-form-item>

      </el-form>
    </div>
    <div class="msg"> You selected :{{msg}}</div>
    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="Pipeline" name="pipeline">
        <vue-pipeline ref="pipeline" :x="parseInt(form.x)" :y="parseInt(form.y)" :data="data" :showArrow="form.showArrow"
          :ystep="parseInt(form.ystep)" :xstep="parseInt(form.xstep)" :lineStyle="form.lineStyle" @select="handleSelect" />
      </el-tab-pane>
      <el-tab-pane label="Data" name="data">
        {{JSON.stringify(this.data)}}
      </el-tab-pane>

    </el-tabs>

    <div>
    </div>
    <!-- <hue /> -->
  </div>
</template>

<script>
import hue from "./hue.vue";
import { hue1, hue3, sample, sample3, sample2 } from "./data.js";

export default {
  name: "app",
  components: {
    // hue
  },
  data() {
    return {
      tab: "pipeline",
      data: hue1.nodes,
      form: {
        x:50,
        y: 55,
        xstep: 120,
        ystep: 70,
        data: 0,
        showArrow: true,
        lineStyle: "default",
        from: 0,
        to: 0
      },
      msg: ""
    };
  },
  watch: {},
  methods: {
    fresh() {
      switch (this.form.data) {
        case 0:
          this.data = hue1.nodes;
          break;
        case 1:
          this.data = hue3.nodes;
          break;
        case 2:
          this.data = sample.nodes;
          break;
        case 3:
          this.data = sample3.nodes;
          break;
        case 4:
          this.data = sample2.nodes;
          break;
      }
       this.$refs["pipeline"].render();
    },
    addLine() {
      let list = this.data[this.form.from].next || [];
      if (list.some(it => it.index == this.form.to)) {
        alert("this line is exist");
      }
      list.push({ index: this.form.to });
      this.data[this.form.from].next = list;
      this.$refs["pipeline"].render();
    },
    handleSelect(node) {
      this.msg = `{ ${node.name} }`;
    }
  },
  mounted() {
    this.data = hue1.nodes;
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 30px 30px;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  /* height: 100vh; */
  /* display: flex; */
  /* flex-direction: column; */
}
.setting {
  margin: 30px;
  width: 800px;
}
.addline {
  display: flex;
  width: 300px;
}
.addline > *:not(:first-child) {
  margin-left: 5px;
}
.msg {
  margin: 20px auto;
  height: 20px;
}
</style>
