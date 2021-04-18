<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <h2>Vue Pipeline</h2>

    <div class="setting">

      <el-form ref="formulary" :model="form" label-width="100px" @validate="fresh">
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
            <el-radio :label="0">HUE 1 </el-radio>
            <el-radio :label="1">HUE 2</el-radio>
            <el-radio :label="2">Tree</el-radio>
            <el-radio :label="3">Sample 4</el-radio>
            <!-- <el-radio :label="4">Sample 5</el-radio> -->
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
      <div>{{form}}</div>
    </div>
    <div class="msg"> You selected :{{msg}}</div>
    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="Pipeline" name="pipeline">
        <vue-pipeline ref="pipeline" :x="form.x" :y="form.y" :data="dataLocale" :showArrow="form.showArrow"
          :ystep="form.ystep" :xstep="form.xstep" :lineStyle="form.lineStyle" @select="handleSelect" />
      </el-tab-pane>
      <el-tab-pane label="Data" name="data">
        {{dataLocale}}
      </el-tab-pane>

    </el-tabs>

    <div>
    </div>
    <!-- <hue /> -->
  </div>
</template>

<script>
// import hue from "./hue.vue";
import { hue1, hue3, sample, sample3, sample2, bug } from './data.js'
import { ref, reactive, onMounted } from 'vue'
export default {
  name: 'app',
  setup () {
    const tab = ref('pipeline')
    const pipeline = ref('')
    const dataLocale = ref([])
    dataLocale.value = hue1.nodes
    const msg = ref('')
    const formulary = ref('')
    const form = ref(reactive({
      x: 50,
      y: 55,
      xstep: 120,
      ystep: 70,
      data: 0,
      showArrow: true,
      lineStyle: 'default',
      from: 0,
      to: 0
    }))
    const fresh = () => {
      switch (form.value.data) {
        case 0:
          dataLocale.value = bug
          break
        case 1:
          dataLocale.value = hue3.nodes
          break
        case 2:
          dataLocale.value = sample.nodes
          break
        case 3:
          dataLocale.value = sample3.nodes
          break
        case 4:
          dataLocale.value = sample2.nodes
          break
      }
      pipeline.value.render()
    }
    const addLine = () => {
      const list = dataLocale.value[form.value.from].next || []
      if (list.some(it => it.index === form.value.to)) {
        alert('this line is exist')
      }
      list.push({ index: form.value.to })
      dataLocale.value[form.value.from].next = list
      pipeline.value.render()
    }
    const handleSelect = (node) => {
      msg.value = `{ ${node.name} }`
    }
    onMounted(() => {
      dataLocale.value = hue1.nodes
      console.log(dataLocale)
    })
    return {
      tab,
      dataLocale,
      form,
      msg,
      pipeline,
      formulary,
      fresh,
      addLine,
      handleSelect
    }
  }
}
</script>

<style>
#app {
  /* text-align: center; */
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 30px 30px;

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
  height: 20px;
  margin: 20px auto;
}
</style>
