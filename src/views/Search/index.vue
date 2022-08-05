<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        shape="round"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  name: 'Search',
  data() {
    return {
      keywords: '',
      isSearchResult: false
    }
  },
  methods: {
    onSearch() {
      this.isSearchResult = true
    },
    onSearchFocus() {
      // 更改计算属性componentName的依赖项，触发计算属性重新计算
      this.isSearchResult = false
    }
  },
  computed: {
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
