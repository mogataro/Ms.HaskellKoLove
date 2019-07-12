<template lang="pug">
section.index
  InitLoading
  GraphLoading(v-if="isGraphLoad")
  Title
  CheckboxList(:prefCodes="prefCodes" @updatePrefCodes="updatePrefCodes")
  Graph(:prefCodes="prefCodes")
</template>

<script>
import Graph from '@/components/Graph'
import CheckboxList from '@/components/CheckboxList'
import InitLoading from '@/components/InitLoading'
import GraphLoading from '@/components/GraphLoading'
import Title from '@/components/Title'

export default {
  components: {
    Graph,
    CheckboxList,
    InitLoading,
    Title,
    GraphLoading
  },
  data() {
    return {
      prefCodes: [],
      isGraphLoad: false
    }
  },
  methods: {
    updatePrefCodes(newPrefCodes) {
      this.prefCodes = newPrefCodes
    },
    graphLoad(isGraphLoad) {
      this.isGraphLoad = isGraphLoad
    }
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
