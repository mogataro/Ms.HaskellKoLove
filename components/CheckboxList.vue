<template lang="pug">
.checkbox-list
  p 都道府県
    //- button(@click="allChecked") 一括選択
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
  button.btn(@click="allAnChecked") 一括削除
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
  },
  methods: {
    allChecked() {
      const allCheckbox = this.$el.querySelectorAll('input[name=prefCode]')
      allCheckbox.forEach((el, index) => {
        this.$set(el, 'checked', true)
      })
      this.prefCodes.length = 0
      this.getPrefectures.forEach(prefecture => {
        this.prefCodes.push(prefecture.prefCode)
      })
    },
    allAnChecked() {
      const allCheckbox = this.$el.querySelectorAll('input[name=prefCode]')
      allCheckbox.forEach(el => (el.checked = false))
      this.prefCodes.splice(0, 47)
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
    margin: 10px 0
    border: 1px solid gray
    border-radius: 4px
    width: 150px
    text-align: center
  .btn
    width: 80px
    margin-right: 20px
    text-align: center
    border: 1px solid gray
    border-radius: 4px
    font-family: "Hiragino Kaku Gothic ProN"
    font-size: 14px
    line-height: 16px
    &:hover
      background: rgba(#FBFBFB, 0.7)
      color: darkGreen
  .checkbox-item
    width: 100px
    height: 24px
    line-height: 24px
    display: inline-block
    &:hover
      color: darkGreen
      cursor: pointer
</style>
