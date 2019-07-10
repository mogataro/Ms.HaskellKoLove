<template lang="pug">
section.index
  Loading
  Title
  CheckboxList(:prefCodes="prefCodes" @updatePrefCodes="updatePrefCodes")
  Graph(:prefCodes="prefCodes")
</template>

<script>
import Graph from '@/components/Graph'
import CheckboxList from '@/components/CheckboxList'
import Loading from '@/components/Loading'
import Title from '@/components/Title'

export default {
  components: {
    Graph,
    CheckboxList,
    Loading,
    Title
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
