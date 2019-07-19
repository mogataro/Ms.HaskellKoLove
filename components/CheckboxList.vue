<template lang="pug">
.checkbox-list
  p 都道府県
  .checkbox-box
    v-checkbox.checkbox-item(
      v-for="(prefecture, index) in getPrefectures"
      :key="index"
      v-model="prefCodes"
      :label="prefecture.prefName"
      name="prefCode"
      color="#5cbbf6"
      :value="prefecture.prefCode"
    )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
      this.actionUpdatePrefCodes(newPrefCodes)
    }
  },
  methods: {
    ...mapActions('prefectures', ['actionUpdatePrefCodes'])
  }
}
</script>

<style lang="sass" scoped>
.checkbox-list
  padding: 0 25px
  .checkbox-box
    border: 1px solid gray
    max-height: 135px
    border-radius: 4px
    overflow-y: auto
  p
    font-size: 30px
    line-height: 30px
    margin: 10px 0
    border: 1px solid gray
    border-radius: 4px
    width: 150px
    text-align: center
  .checkbox-item
    width: 100px
    height: 24px
    line-height: 24px
    display: inline-block
</style>
