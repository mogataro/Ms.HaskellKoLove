<template lang="pug">
section.index
  Loading
  CheckboxList(:prefCodes="prefCodes" @updatePrefCodes="updatePrefCodes")
  Graph(:prefCodes="prefCodes")
</template>

<script>
import Graph from '@/components/Graph'
import CheckboxList from '@/components/CheckboxList'
import Loading from '@/components/Loading'

export default {
  components: {
    Graph,
    CheckboxList,
    Loading
  },
  data() {
    return {
      prefCodes: []
    }
  },
  methods: {
    updatePrefCodes(newPrefCodes) {
      this.prefCodes = newPrefCodes
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
