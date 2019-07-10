<template lang="pug">
  .checkbox-list
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

<style lang="sass" scoped></style>
