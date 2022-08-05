<template>
  <div class="channelPopup">
    <van-cell title="我的频道">
      <template #default>
        <van-button
          class="edit-btn"
          size="small"
          hairline
          plain
          round
          color="red"
          @click="isEdit = !isEdit"
        >
          {{ isEdit ? '完成' : '编辑' }}
        </van-button>
      </template>
    </van-cell>
    <van-grid gutter="0.26666rem">
      <van-grid-item
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" />
    <van-grid gutter="0.2rem">
      <van-grid-item
        class="recommend-item"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        @click="$emit('add-channel', item)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels as getAllChannelsApi } from '@/api'
export default {
  name: 'ChannelPopup',
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    // 获取所有频道
    async getAllChannels() {
      const { data } = await getAllChannelsApi()
      this.allChannels = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        if (item.name === '推荐') return
        this.$emit('del-channel', item.id)
      } else {
        this.$parent.$parent.show = false
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    // 推荐频道
    recommendChannels() {
      return this.allChannels.filter((aItem) => {
        return !this.myChannels.find((mItem) => mItem.id === aItem.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.channelPopup {
  padding-top: 1.333333rem;
  .edit-btn {
    width: 1.38667rem;
    height: 0.64rem;
  }

  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }

  :deep(.recommend-item) {
    .van-grid-item__content {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 40px;
      }
      .van-grid-item__text {
        margin-top: 5px;
        margin-left: 0.21333rem;
      }
    }
  }

  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
      color: red;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        border: 1px solid red;
        border-radius: 50%;
        font-size: 30px;
      }
    }
  }

  .active {
    :deep(.van-grid-item__text) {
      color: red;
    }
  }
}
</style>
