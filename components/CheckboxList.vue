<template lang="pug">
.checkbox-list
  p 都道府県
  label.checkbox-item(
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CheckboxList',
  data() {
    return {
      prefCodes: []
    }
  },
  computed: {
    ...mapGetters('prefectures', ['getPrefectures'])
  },
  watch: {
    prefCodes(newPrefCodes, oldPrefCodes) {
      this.$emit('updatePrefCodes', newPrefCodes)
    }
  }
}
</script>

<style lang="sass" scoped>
.checkbox-list
  padding: 0 25px
  p
    font-size: 30px
    line-height: 30px
    margin: 20px 0
    border: 1px solid gray
    border-radius: 4px
    width: 150px
    text-align: center
  .checkbox-item
    width: 100px
    height: 24px
    line-height: 24px
    display: inline-block
    &:hover
      color: darkGreen
</style>
