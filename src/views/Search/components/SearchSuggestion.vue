<template>
  <div>
    <van-cell
      v-for="(s, index) in highlightSuggestion"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="s"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsApi } from '@/api'
import { debounce } from 'lodash'
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
    getSearchSuggestions: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsApi(this.keywords)
        this.suggestionList = data.data.options.filter(Boolean) // ((item) => item !== null)去除数组中的价值
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300)
  },
  computed: {
    highlightSuggestion() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestionList.map((item) => {
        return item.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },

  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestions()
      }
    }
  }
}
</script>

<style></style>
