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
          type: 'line',
          backgroundColor: 'transparent',
          borderColor: '#EEEEEEE'
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
            text: '年度'
          },
          categories: this.getAllYears
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
        legend: {
          //グラフの凡例
          layout: 'vertical', //縦方向に並べる
          align: 'right', //グラフの右に表示（左右中央）
          verticalAlign: 'top' //グラフの中央に表示（上下中央）
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
        plotOptions: {
          // spline: {
          //   marker: {
          //     radius: 4,
          //     lineColor: '#666666',
          //     lineWidth: 1
          //   }
          // }
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
  #chartdiv
    width: 100%
    height: 500px
</style>
