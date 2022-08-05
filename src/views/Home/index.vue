<template>
  <div>
    <!-- 搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          class="search-btn"
          round
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 滑动标签页 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="tag.name" v-for="tag in myChannels" :key="tag.id">
        <Article :id="tag.id" />
      </van-tab>
      <van-cell is-link @click="showPopup"
        ><span class="toutiao toutiao-gengduo1"></span>
      </van-cell>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      :style="{ height: '97.5%' }"
      position="bottom"
      closeable
      close-icon-position="top-left"
    >
      <channel-popup
        :myChannels="myChannels"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-popup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannel as delChannelApi,
  addChannel,
  setMyChannelsToLocal,
  getMyChannelsByLocal
} from '@/api'
import Article from './components/Article.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  components: { Article, ChannelPopup },
  created() {
    this.getMyChannels()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    // 隐藏显示弹出层
    showPopup() {
      this.show = true
    },
    // 初始化myChannels
    initMyChannels() {
      if (this.isLogin) {
        this.getMyChannels()
      } else {
        const myChannels = getMyChannelsByLocal()
        if (myChannels) {
          this.myChannels = myChannels
        } else {
          this.getMyChannels()
        }
      }
    },
    async getMyChannels() {
      try {
        if (this.isLogin) {
          const res = await getMyChannelAPI()
          this.myChannels = res.data.data.channels
        } else {
          this.myChannels = getMyChannelsByLocal()
        }
      } catch (error) {
        console.dir(error)
        this.$toast.fail('页面获取失败，请刷新')
      }
    },
    // 删除频道
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelApi(id)
        } else {
          setMyChannelsToLocal(newChannels)
        }
        this.myChannels = newChannels
        this.$toast.success('频道删除成功')
      } catch (error) {
        this.$toast.fail('频道删除失败')
      }
    },
    // 添加请求
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannels.length)
        } else {
          setMyChannelsToLocal([...this.myChannels, channel])
        }
        this.myChannels.push(channel)
        this.$toast.success('频道添加成功')
      } catch (error) {
        this.$toast.fail('频道添加失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  position: sticky;
  top: 0;
  right: 0;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 2;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 1;
  border-bottom: 1px solid #eee;

  position: fixed;
  top: 92px;
  right: 0;
  background: #fff;
  z-index: 2;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
    background: #fff;
  }
}

.van-tab__pane {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
:deep(.van-tabs__content) {
  padding-bottom: 100px;
  .van-cell__value {
    display: flex;
  }
}
</style>
