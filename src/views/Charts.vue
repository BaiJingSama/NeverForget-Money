<template>
  <div>
    <Layout>
      <div class="chart-wrapper" ref="chartWrapper">
        <Chart class="chart" :options="chartOptions"></Chart>
      </div>
    </Layout>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component } from 'vue-property-decorator'
import Chart from '@/components/Chart.vue'
import _ from 'lodash'
import day from 'dayjs'

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  newTagList: newTag[];
};

type Tag = {
  id: string;
  name: string;
};

type newTag = {
  name: string;
  value: string;
};

@Component({
  components: { Chart }
})

export default class Charts extends Vue {
  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

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

  get y() {
    const today = new Date()
    const array = []
    for (let i = 0; i <= 29; i++) {
      const dateString = day(today).subtract(i, 'day').format('YYYY-MM-DD')
      const found = _.find(this.recordList, { createdAt: dateString })
      array.push({
        date: dateString, value: found ? found.amount : 0
      })
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1
      } else if (a.date === b.date) {
        return 0
      } else {
        return -1
      }
    })

    return array
  }

  get chartOptions() {

    const keys = this.y.map(item => item.date)
    const values = this.y.map(item => item.value)

    return {
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
        data: keys,
        axisTick: {
          alignWithLabel: true
        },
        axisLine: { lineStyle: { color: '#666' } },
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5)

          }
        }
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
          data: values,
          type: 'line'
        }
      ],
    }
  }
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