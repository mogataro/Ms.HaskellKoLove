<template lang="pug">
section.index
  p(@click="onClick") あああ
  //- p {{getPrefectureId(2)}}
  //- p {{getPrefectures}}
  p {{getPopulationId(1)}}
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('prefectures', ['getPrefectures', 'getPrefectureId']),
    ...mapGetters('population', ['getPopulation', 'getPopulationId'])
  },
  methods: {
    async onClick() {
      const data = await this.$axios
        .get('v1/population/society/forArea?prefCode=13', {
          headers: {
            'X-API-KEY': process.env.API_KEY
          },
          data: {}
        })
        .then(res => {
          return { datas: res.data }
        })
        .catch(e => {
          console.log(e)
        })
      console.log(data)
    }
  }
}
</script>

<style></style>
