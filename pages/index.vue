<template lang="pug">
section.index
  label(
    v-for="(prefecture, index) in getPrefectures"
    :key="index"
  )
    input(
      type="checkbox"
      name="prefCode"
      :value="prefecture.prefCode"
      v-model="prefCodes"
      @change="onChange()"
    )
    span {{prefecture.prefName}}
  Graph(:prefCodes="prefCodes")
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Graph from '@/components/Graph'

export default {
  components: {
    Graph
  },
  data() {
    return {
      prefCodes: []
    }
  },
  computed: {
    ...mapGetters(['getPrefectures', 'getPrefectureId'])
  },
  mounted() {
    // this.fetchPopulation()
  },
  methods: {
    // ...mapActions('prefectures', ['fetchPrefectures']),
    // ...mapActions('population', ['fetchPopulation']),
    onChange() {
      // console.log(this.prefCodes)
    }
  }
}
</script>

<style></style>
