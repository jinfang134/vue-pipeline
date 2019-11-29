<template>
  <div class="page">
    <div class="container">
      <div class="start">start</div>
      <div class="line" ></div>
      <div class="node">
        <span class="label">Ammouncement Import</span>
        <div class="circle success" style=" margin-bottom: 20px;"></div>
      </div>
      <div class="line" ></div>
      <img src="./assets/brace.svg" class="brace">
      <div class="status-list">
        <div class="info-item">
          <div class="status circle success"></div>
          <div class="info-label">Personal Info</div>
        </div>
        <div class="info-item">
          <div class="status circle failure"></div>
          <div class="info-label">Address Info</div>
        </div>
        <div class="info-item">
          <div class="status circle failure"></div>
          <div class="info-label">Family Info</div>
        </div>
        <div class="info-item">
          <div class="status circle success"></div>
          <div class="info-label">Education Info</div>
        </div>
        <div class="info-item">
          <div class="status circle failure"></div>
          <div class="info-label">Degree Info</div>
        </div>
        <div class="info-item">
          <div class="status circle success"></div>
          <div class="info-label">Address Info</div>
        </div>
        <div class="info-item">
          <div class="status circle success"></div>
          <div class="info-label">Address Info</div>
        </div>
      </div>
       <div class="line" style=""></div>
       <div class="circle end"></div>
       <div style="margin-left:4px">End</div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {}
};
</script>

<style scoped lang="css">
.page{
    width:100%;
    text-align: center;
}
.container {
  display: flex;
  align-items: center;
}
.node {
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:0px -60px 10px -60px;
}
.node .label {
  margin-bottom: 12px;
}
.circle {
  height: 24px;
  width: 24px;
  border-radius: 50%;
}
.in-line {
  margin-bottom: 20px;
}
.start {
  color: #8a8a8a;
  text-align: center;
  width: 60px;
  border-radius: 30px;
  border-width: 3px;
  border-style: solid;
}
.line {
  color: #8a8a8a;
  border-top-width: 3px;
  width: 120px;
  height: 1px;
  border-top-style: solid;
}
.brace {
  /* height:300px; */
  margin-left: -85px;
  width: 200px;
}
.status-list {
  margin-left: -70px;
  margin-right: 10px;
}
.info-item {
  display: flex;
  align-items: center;
}
.info-item:not(:first-child) {
  margin-top: 8px;
}
.info-item .circle{
    /* margin-bottom: 4px; */
}

.info-label {
  margin-left: 4px;
}
.success{
    background-color: green;
}
.failure{
    background-color: red;
}

.end{
    background-color: #8a8a8a;
}
</style>
