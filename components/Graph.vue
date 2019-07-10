<template lang="pug">
.graph
  VueHighcharts(
    :options="options"
    ref="lineCharts"
  )
  button(@click="load") load
  button(@click="reload") reload
</template>
<script>
import { mapGetters } from 'vuex'
import pop from '@/static/pop.json'

export default {
  props: {
    prefCodes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      pop: pop,
      options: {
        chart: {
          type: 'line',
          backgroundColor: 'transparent',
          borderColor: '#EEEEEEE'
        },
        title: {
          text: 'Monthly Average Temperature'
        },
        subtitle: {
          text: 'Source: WorldClimate.com'
        },
        xAxis: {
          categories: this.getAllYears,
          title: {
            text: '年度'
          }
        },
        yAxis: {
          title: {
            text: '人口数'
          },
          labels: {
            formatter: function() {
              return this.value.toLocaleString()
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: []
      }
    }
  },
  computed: {
    ...mapGetters('population', ['getAllYears', 'getPopulationValueId']),
    ...mapGetters('prefectures', ['getPrefectureId']),
    asyncDatas() {
      let result = []
      this.prefCodes.forEach(prefCode => {
        result.push({
          data: this.getPopulationValueId(prefCode),
          name: this.getPrefectureId(prefCode)
        })
      })
      return result
    }
  },
  watch: {
    prefCodes(newPrefArray, oldPrefArray) {
      this.load()
    }
  },
  methods: {
    async load() {
      let lineCharts = this.$refs.lineCharts
      await lineCharts.delegateMethod('showLoading', 'Loading...')
      lineCharts.removeSeries()
      this.asyncDatas.forEach(item => {
        lineCharts.addSeries(item)
      })
      // lineCharts.addSeries(asyncData)
      lineCharts.hideLoading()
    },
    reload() {
      let lineCharts = this.$refs.lineCharts
      lineCharts.removeSeries()
    }
  }
}
</script>
<style lang="sass" scoped>
.graph
  #chartdiv
    width: 100%
    height: 500px
</style>
