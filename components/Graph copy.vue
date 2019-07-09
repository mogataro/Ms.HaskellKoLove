<template lang="pug">
.graph
  p {{getPopulationYearId(47)}}
  #chartdiv
</template>
<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import sapporo_2018 from '@/static/sapporo_2018.json'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Graph2',
  props: {
    prefCode: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      sapporo_2018
    }
  },
  computed: {
    ...mapGetters('population', [
      'getPopulation',
      'getPopulationYearId',
      'getPopulationValueId'
    ])
  },
  mounted() {
    // console.log(this.getPopulationId(47))
    this.drawChart()
  },
  methods: {
    drawChart() {
      const chart = am4core.create('chartdiv', am4charts.XYChart)
      chart.data = this.getPopulationId(47)
      // x軸
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.baseInterval = { timeUnit: 'year', count: 5 }
      // グリッド間隔
      dateAxis.renderer.minGridDistance = 50
      // y軸
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

      // 時系列データ
      const series = chart.series.push(new am4charts.LineSeries())
      series.name = 'population'
      series.dataFields.valueY = 'value'
      series.dataFields.dateX = 'year'
      series.tooltipText = '{valueY}'
      series.tooltip.pointerOrientation = 'vertical'

      // カーソルに追従するライン
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.snapToSeries = series
      chart.cursor.xAxis = dateAxis
    },
    pushSeries(chart, series) {
      chart.series.push(series)
      if (chart.scrollbarX) {
        series.events.disableType('datavalidated')
        chart.scrollbarX.series.push(series)
        chart.scrollbarX.scrollbarChart.xAxes.getIndex(0).hide()
      }
    },
    removeSeries(chart, series) {
      chart.series.removeValue(series)
      if (chart.scrollbarX) {
        const scrollbarXSeries = this.findScrollBarXSeries(series.name)
        chart.scrollbarX.scrollbarChart.series.removeValue(scrollbarXSeries)
      }
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
