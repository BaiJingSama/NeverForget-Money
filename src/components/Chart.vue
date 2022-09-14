<template>
  <div class="wrapper" ref="wrapper" :style="width">
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import * as echarts from 'echarts';
import { EChartsOption, ECharts } from "echarts";



@Component
export default class Chart extends Vue {
  @Prop() options?: EChartsOption
  chart?: ECharts
  width = '400px'

  mounted() {
    if (this.options === undefined) {
      return console.error('options为空');

    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
    this.chart.setOption(this.options)
  }

  @Watch('options')
  onOptionsChange(newValue: EChartsOption) {
    this.chart!.setOption(newValue)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>