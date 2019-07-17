<template lang="pug">
.graph
  VueHighcharts(
    :options="vueHighchartsOptions"
    ref="lineCharts"
  )
</template>
<script>
import { mapGetters } from 'vuex'
import vueHighchartsOptions from '@/mixins/vueHighchartsOptions'

export default {
  mixins: [vueHighchartsOptions],
  computed: {
    ...mapGetters('population', ['getAllYears', 'getPopulationValueId']),
    ...mapGetters('prefectures', ['getPrefectureId', 'getPrefCodes']),
    asyncDatas() {
      let result = []
      this.getPrefCodes.forEach(prefCode => {
        result.push({
          data: this.getPopulationValueId(prefCode),
          name: this.getPrefectureId(prefCode)
        })
      })
      return result
    }
  },
  watch: {
    getPrefCodes(newPrefArray, oldPrefArray) {
      this.load()
    }
  },
  mounted() {
    this.initload()
  },
  methods: {
    load() {
      let lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      lineCharts.removeSeries()
      this.asyncDatas.forEach(item => {
        lineCharts.addSeries(item)
      })
      lineCharts.hideLoading()
    },
    initload() {
      let lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
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
