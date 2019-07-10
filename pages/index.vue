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
    )
    span {{prefecture.prefName}}
  Graph(:prefCodes="prefCodes")
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters('prefectures', ['getPrefectures'])
  }
}
</script>

<style></style>
