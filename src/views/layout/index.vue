<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye1"></span>
          <span class="icom-info">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="icom-info">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
          <span class="icom-info">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span class="icom-info">我的</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
  .toutiao {
    font-size: 38px;
  }
  .icom-info {
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
