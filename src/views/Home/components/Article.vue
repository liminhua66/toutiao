<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="getNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        @load="getNextPageArticle"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        :error.sync="error"
        error-text="加载失败，点击重新加载"
        :finished="isFinished"
        finished-text="没有更多了"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'Article',
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    // 获取第一页的数据
    async getFirstPageArticle() {
      try {
        const res = await getArticleAPI(this.id, +new Date())
        this.articles = res.data.data.results
        this.pre_timestamp = res.data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请刷新页面重新获取')
      }
    },
    // 获取下一页数据
    async getNextPageArticle() {
      try {
        // 1.发送请求
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)

        // 判断数据是否加载完毕
        if (data.data.pre_timestamp === null) {
          this.isFinished = true
        }

        // 2.存储数据
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 3.更新时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 4.更新loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
