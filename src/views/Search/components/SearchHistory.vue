<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon name="delete-o" @click="delSearchHistory" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
    />
  </div>
</template>

<script>
export default {
  props: {
    searchHistory: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    delSearchHistory() {
      localStorage.removeItem('searchHistory')
      this.$emit('getLocalData')
    }
  }
}
</script>

<style></style>
