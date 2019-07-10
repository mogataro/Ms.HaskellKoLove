<template lang="pug">
.graph
  VueHighcharts(
    :options="options"
    ref="lineCharts"
  )
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    prefCodes: {
      type: Array,
      default() {
        return []
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
    },
    options() {
      return {
        chart: {
          type: 'spline',
          backgroundColor: 'transparent'
        },
        title: {
          text: ''
        },
        xAxis: {
          labels: {
            style: {
              fontSize: '12px'
            }
          },
          title: {
            text: '年度(年)'
          },
          type: 'datetime',
          categories: this.getAllYears,
          lineWidth: 2
        },
        yAxis: {
          title: {
            text: '人口数(人)'
          },
          labels: {
            formatter: function() {
              return this.value.toLocaleString()
            }
          },
          lineWidth: 2
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top'
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          useHTML: true,
          formatter() {
            return this.points.map(point => {
              return `
                <i style="
                  background-color:${point.color};
                  border-radius:50%;
                  display: inline-block;
                  height:6px;
                  margin-right:4px;
                  width:6px;"
                ></i>${
                  point.series.name
                }: <b>${point.y.toLocaleString()}</b><br>`
            })
          }
        },
        credits: {
          enabled: false
        },
        series: []
      }
    }
  },
  watch: {
    prefCodes(newPrefArray, oldPrefArray) {
      this.load()
    }
  },
  mounted() {
    this.initload()
  },
  methods: {
    async load() {
      let lineCharts = this.$refs.lineCharts
      await lineCharts.delegateMethod('showLoading', 'Loading...')
      lineCharts.removeSeries()
      this.asyncDatas.forEach(item => {
        lineCharts.addSeries(item)
      })
      lineCharts.hideLoading()
    },
    async initload() {
      let lineCharts = this.$refs.lineCharts
      await lineCharts.delegateMethod('showLoading', 'Loading...')
      lineCharts.addSeries([])
      lineCharts.removeSeries()
      lineCharts.hideLoading()
    }
  }
}
</script>
<style lang="sass" scoped>
.graph
  margin-top: 10px
</style>
