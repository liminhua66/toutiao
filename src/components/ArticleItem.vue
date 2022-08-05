<template>
  <!-- 没有图片 -->
  <van-cell
    :title="articleInfo.title"
    :label="label"
    v-if="articleInfo.cover.type === 0"
  ></van-cell>
  <!-- 一张图片 -->
  <van-cell
    title="单元格"
    value="内容"
    :label="label"
    v-else-if="articleInfo.cover.type === 1"
  >
    <template #default>
      <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
    </template>
  </van-cell>
  <!-- 三张图片 -->
  <van-cell title="单元格" value="内容" :label="label" v-else>
    <template #default>
      <van-image
        width="100"
        height="100"
        :src="i"
        v-for="(i, index) in articleInfo.cover.images"
        :key="index"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style scoped lang="less">

</style>
