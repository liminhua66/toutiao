<template>
  <div>搜索结果</div>
</template>

<script>
import { getSearchResultApi } from '@/api'
export default {
  data() {
    return {
      suggestionList: []
    }
  },
  props: {
    keywords: {
      type: String
    }
  },
  methods: {
    async getSearchResult() {
      const { data } = await getSearchResultApi(this.keywords)
      console.log(data)
    }
  }
}
</script>

<style></style>
