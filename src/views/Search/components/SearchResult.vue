<template>
  <div>
    <van-cell
      v-for="(item, index) in result"
      :key="index"
      :title="item.title"
    />
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api'
export default {
  data() {
    return {
      result: []
    }
  },
  props: {
    keywords: {
      type: String
    }
  },
  created() {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult() {
      try {
        const { data } = await getSearchResultApi(this.keywords)
        this.result = data.data.results
      } catch (error) {
        this.$toast.fail('获取数据失败，请重新获取')
      }
    }
  }
}
</script>

<style></style>
