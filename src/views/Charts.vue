<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
      <div class="title-box">
        <span v-if="type === '+'">最近30天总收入：{{ total }}元</span>
        <span v-else>最近30天总支出：{{ total }}元</span>
      </div>
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
import Tabs from '@/components/Tabs.vue'
import typeList from '@/constants/typeList'
import clone from "@/lib/clone";
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
  components: { Chart, Tabs }
})

export default class Charts extends Vue {
  type = '-'
  typeList = typeList

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement)
    div.scrollLeft = div.scrollWidth
  }

  get tag() {
    const items = this.keyValueList.map(f => f.items)
    const newItems = items.filter(f => f).reduce((pre, next) => {
      return pre!.concat(next!)
    }, [])
    const items2 = newItems?.map(f => f.newTag).reduce((pre, next) => {
      return pre!.concat(next!)
    }, []).map(f => f.value)
    return items2

  }



  get total() {
    const found = this.keyValueList.map(f => f.value).reduce((pre, next) => {
      return pre! + next!
    }, 0)
    return found
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get keyValueList() {
    const today = new Date()
    const array = []
    for (let i = 0; i <= 29; i++) {
      const dateString = day(today).subtract(i, 'day').format('YYYY-MM-DD')
      const found = _.find(this.groupedList, { title: dateString })
      const items = found?.items
      array.push({
        date: dateString, value: found ? found.total : 0, items: found ? items : undefined
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
    console.log(array);

    return array
  }

  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) { return [] }
    const newList = clone(recordList)
      .filter(r => r.type === this.type)
      .sort((a, b) => day(b.createdAt)
        .valueOf() - day(a.createdAt).valueOf())


    if (newList.length === 0) { return [] as Result }
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{ title: day(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]] }]


    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1];
      if (day(last.title).isSame(day(current.createdAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({ title: day(current.createdAt).format('YYYY-MM-DD'), items: [current] })
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
    })
    return result
  }

  get chartOptions() {

    const keys = this.keyValueList.map(item => item.date)
    const values = this.keyValueList.map(item => item.value)

    return {
      grid: {
        left: 0,
        right: 0,
        top: 18,
        bottom: 18,
        height: 200
      },
      tooltip: {
        show: true,
        formatter: '{c}元',

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
        axisLabel: {
          show: false,
          interval: 4
        },
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

.noResult {
  padding: 16px;
  padding-top: 32px;
  text-align: center;
  font-size: 18px;
}

::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #6da4ca;
    ;
    color: white;

    &::after {
      display: none;
    }
  }
}

::v-deep li.interval-tabs-item {
  font-size: 18px;
  height: 48px;
  background: #8abdd2;
  color: white;

  &::after {
    color: white;
    background: white;
  }
}
</style>