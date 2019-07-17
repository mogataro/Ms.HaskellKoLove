<template lang="pug">
section.index
  Loading
  Title
  CheckboxList
  Graph
</template>

<script>
import Graph from '@/components/Graph'
import CheckboxList from '@/components/CheckboxList'
import Loading from '@/components/Loading'
import Title from '@/components/Title'
import { mapActions } from 'vuex'

export default {
  components: {
    Graph,
    CheckboxList,
    Loading,
    Title
  },
  mounted() {
    this.fetchPopulation()
    this.fetchPrefectures()
  },
  methods: {
    ...mapActions('population', ['fetchPopulation']),
    ...mapActions('prefectures', ['fetchPrefectures'])
  }
}
</script>

<style lang="sass" scoped>
.index
  position: relative
  width: 100%
  heidth: 100%
  min-height: 100vh
</style>
