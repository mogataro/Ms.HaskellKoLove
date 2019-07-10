<template lang="pug">
.title
  p 都道府県別の総人口推移グラフ
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Title'
}
</script>

<style lang="sass" scoped>
.title
  background: skyblue
  height: 60px
  p
    color: #FBFBFB
    font-size: 40px
    line-height: 60px
    text-align: center
</style>
