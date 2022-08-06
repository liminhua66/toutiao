<template>
  <div class="body">
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width=".8rem" height=".8rem" :src="UserInfo.photo" />
      <input
        type="file"
        hidden
        ref="file"
        accept=".jpg,.png"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 头像弹层 -->
    <van-popup
      class="popup-avator"
      v-model="isShowAavtor"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
    >
      <updata-avator
        :photo="photo"
        v-if="isShowAavtor"
        @upload-avator="UserInfo.photo = $event"
      ></updata-avator>
    </van-popup>
    <van-cell title="昵称" is-link :value="UserInfo.name" />
    <van-cell
      title="性别"
      is-link
      :value="UserInfo.gender === 1 ? '女' : '男'"
    />
    <van-cell title="生日" is-link :value="UserInfo.birthday" />
  </div>
</template>

<script>
import { resolveToBase64 } from '@/utils'
import { getUserInfo } from '@/api'
import UpdataAvator from './componets/UpdataAvator.vue'
export default {
  components: { UpdataAvator },
  name: 'User',
  data() {
    return {
      UserInfo: {},
      isShowAavtor: false,
      photo: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.UserInfo = data.data
      } catch (error) {
        this.$toast.fail('用户信息获取失败，请刷新页面')
      }
    },
    // input发生变化时，即用户选择图片时触发
    async selectPhoto(e) {
      const file = e.target.files[0]
      const url = await resolveToBase64(file)
      this.photo = url
      // 清空，下一次选同一张图片仍然会触发事件
      e.target.value = ''
      this.isShowAavtor = true
    }
  }
}
</script>

<style scoped lang="less">
.body {
  min-height: 100vh;
  background: #f5f7f9;
}
:deep(.van-nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__content {
    .van-icon-arrow-left:before {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
.popup-avator {
  background: #000;
}
</style>
