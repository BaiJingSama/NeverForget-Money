<template>
  <div>
    <Layout>
      <Chart :options="x"></Chart>
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
    tooltip: {
      show: true,
    },
    xAxis: {
      type: 'category',
      data: this.getDay(31)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: this.getData(31),
        type: 'line'
      }
    ],
  };

}
</script>

<style lang="scss" scoped>
</style>