<template lang="pug">
.graph
  p {{prefCodes}}
  VueHighcharts(:options="lineData")
</template>
<script>
import sapporo_2018 from '@/static/sapporo_2018.json'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Graph',
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
      initLinedata: null,
      lineData: null
    }
  },
  computed: {
    ...mapGetters([
      'getPrefectureId',
      'getAllYears',
      'getPopulation',
      'getPopulationYearId',
      'getPopulationValueId'
    ])
  },
  watch: {
    prefCodes(newPref, oldPref) {
      // this.lineData = this.setLineData(newPref)
    }
  },
  mounted() {
    this.initLineData()
  },
  methods: {
    seriesObject(prefCode) {
      return {
        name: this.getPrefectureId(prefCode),
        data: this.getPopulationValueId(prefCode)
      }
    },
    seriesArray(prefCodes) {
      let array = []
      // prefCodes.forEach(prefCode => {
      //   array.push(this.seriesObject(prefCode))
      // })
      for (let i = 1; i <= 47; i++) {
        // if (prefCodes.indexOf(i) >= 0) {
        array.push(this.seriesObject(i))
        // }
      }
      console.log(array)
      return array
    },
    allSeriesArray() {
      let array = []
      for (let i = 1; i <= 47; i++) {
        array.push(this.seriesObject(i))
      }
      return array
    },
    initLineData() {
      this.lineData = this.setLineData()
    },
    setLineData(newPref) {
      let lineData = {
        chart: {
          backgroundColor: 'transparent',
          borderColor: '#EEEEEEE',
          minHeight: '500px',
          spacingRight: 20,
          type: 'line'
        },
        title: {
          align: 'left',
          margin: 24,
          style: {
            fontSize: '16px'
          },
          text: 'Title',
          x: 0
        },
        legend: {
          align: 'right',
          itemStyle: {
            color: '#0066FF'
          },
          layout: 'vertical',
          symbolWidth: 40,
          verticalAlign: 'top',
          useHTML: true,
          enabled: true,
          navigation: {
            enabled: false
          }
        },
        plotOptions: {
          series: {
            events: {
              legendItemClick() {
                return true
              }
            }
          }
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.getAllYears,
          endOnTick: true,
          labels: {
            style: {
              fontSize: '12px'
            }
          },
          // x軸のいろ
          lineColor: '#CCCCCC',
          lineWidth: 1,
          maxPadding: 0,
          minPadding: 0,
          startOnTick: true,
          tickLength: 0,
          tickInterval: 1,
          title: {
            text: '年度'
          }
        },
        yAxis: {
          gridLineColor: '#CCCCCC',
          labels: {
            style: {
              fontSize: '12px'
            }
          },
          // y軸のいろ
          lineColor: '#CCCCCC',
          lineWidth: 1,
          title: {
            text: '人口数'
          }
        },
        series: []
      }
      this.$set(lineData, 'series', this.allSeriesArray())
      console.log(lineData.series)
      return lineData
    }
    // dataOptions(type, options) {
    //   const selected = type == options.type
    //   const color = selected ? '#0066FF' : 'gray'
    //   return {
    //     color,
    //     data: this.categories[type].data,
    //     lineWidth: selected ? 3 : 1,
    //     marker: {
    //       enabled: true,
    //       fillColor: color,
    //       radius: 6,
    //       symbol: 'circle'
    //     },
    //     name: this.categories[type].name,
    //     showInLegend: true,
    //     zIndex: selected ? 1 : 0
    //   }
    // },
  }
}
</script>
<style lang="sass" scoped>
.graph
  #chartdiv
    width: 100%
    height: 500px
</style>
