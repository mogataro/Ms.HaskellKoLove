<template lang="pug">
.loading
  p グラフを描写しています。しばらくお待ちください。
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GraphLoading',
  data() {
    return {
      src: require('@/assets/img/neko.gif')
    }
  },
  computed: {
    ...mapGetters('population', ['getPopulationLength'])
  },
  watch: {}
}
</script>

<style lang="sass" scoped>
.loading
  position: fixed
  top: 0
  left: 0
  width: 100%
  min-width: 700px
  min-height: 100%
  height: 100%
  background: rgba(black, 0.7)
  z-index: 999
  overflow: auto
  p
    text-align: center
    font-size: 30px
    height: 50px
    line-height: 50px
    color: white
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
</style>
