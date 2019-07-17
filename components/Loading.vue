<template lang="pug">
.loading(v-if="getPopulationLength < 47")
  p {{getPopulationLength}}個目/47個のデータをロードしています。
  .top
    img(:src="src" width="200px")
    img(:src="src" width="200px")
    img(:src="src" width="200px")
  .bottom
    img(:src="src" width="200px")
    img(:src="src" width="200px")
    img(:src="src" width="200px")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Loading',
  data() {
    return {
      src: require('@/assets/img/neko.gif')
    }
  },
  computed: {
    ...mapGetters('population', ['getPopulationLength'])
  }
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
  background: black
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
  .top
    width: 650px
    margin: auto
  .bottom
    position: absolute
    bottom: 0
    width: 650px
    left: 0
    right: 0
    margin: auto
</style>
