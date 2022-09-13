<template>
  <div>
    <Layout>
      <div class="chart-wrapper" ref="chartWrapper">
        <Chart class="chart" :options="x"></Chart>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from 'vue-property-decorator'
import Chart from '@/components/Chart.vue'

@Component({
  components: { Chart }
})

export default class Charts extends Vue {

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement)
    div.scrollLeft = div.scrollWidth
  }

  getDay(day: number) {
    let days: string[] = []
    for (let i = 0; i < day; i++) {
      days.push(i.toString() + '号')
    }
    return days
  }

  getData(counter: number) {
    let dates: number[] = []
    for (let i = 0; i < counter; i++) {
      dates.push(i * Math.ceil(Math.random() * counter))
    }
    return dates
  }

  x = {
    grid: {
      left: 0,
      right: 0,
      top: 6,
      bottom: 18,
      height: 200
    },
    tooltip: {
      show: true,
      formatter: '{c}',
    },
    xAxis: {
      type: 'category',
      data: this.getDay(31),
      axisTick: {
        alignWithLabel: true
      },
      axisLine: { lineStyle: { color: '#666' } }
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    series: [
      {
        symbolSize: 15,
        itemStyle: {
          borderWidth: 30,
          radius: 10,
          color: 'skyblue'
        },
        data: this.getData(31),
        type: 'line'
      }
    ],
  };

}
</script>

<style lang="scss" scoped>
.chart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>