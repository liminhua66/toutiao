<template>
  <div>
    <!-- 抬头 -->
    <div>
      <van-nav-bar title="登入" />
    </div>
    <!-- from表单 -->
    <div>
      <van-form @submit="onSubmit" class="from" ref="form">
        <van-field
          v-model="mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="phoneRoules"
        >
          <template #label>
            <span class="toutiao toutiao-shouji"></span>
          </template>
        </van-field>
        <van-field
          v-model="code"
          name="code"
          placeholder="请输入验证码"
          :rules="codeRoules"
        >
          <template #label>
            <span class="toutiao toutiao-yanzhengma"></span>
          </template>
          <template #button>
            <van-button
              round
              size="mini"
              color="#eee"
              v-if="isShowCode"
              @click="sendCode"
              native-type="button"
              >发送验证码</van-button
            >
            <van-count-down
              :time="60 * 1000"
              format="ss秒"
              v-else
              @finish="isShowCode = true"
            />
          </template>
        </van-field>
        <div style="margin: 0.42rem">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { phoneRoules, codeRoules } from './rules'
import { getLogin, getCodeApi } from '@/api'
export default {
  name: 'login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRoules,
      phoneRoules,
      isShowCode: true
    }
  },
  methods: {
    async onSubmit() {
      // q1: res是什么?
      //  - axios封装的对象, 她把服务端返回的数据放在res.data里

      // q2: res是什么?
      //  - Promise的resolve的值

      // q3: error是什么?
      //  - Promise reject的结果
      //  - axios封装的error
      //  - error.response.data是服务端返回的数据
      //  - error.response.status 是服务端返回的状态码
      const dataObj = { mobile: this.mobile, code: this.code }
      try {
        const {
          data: { data: token }
        } = await getLogin(dataObj)
        this.$store.commit('SET_TOKEN', token)
        // 跳转到profile
        this.$router.push('/profile')
        this.$toast.success('登入成功')
      } catch (error) {
        console.dir(error)
        const status = error.response.status
        let message = '请重新登入'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      // 1.验证手机号
      this.$refs.form.validate('mobile').then(async () => {
        try {
          // 2.发送请求
          const res = await getCodeApi(this.mobile)
          console.log(res)
          // 3.显示倒计时
          this.isShowCode = false
          // 4.弹窗提示
          this.$toast.success('亲，发送成了')
        } catch (error) {}
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
:deep(.from) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .van-button--round {
    color: #917b66 !important;
  }
}
// 验证码样式
:deep(.van-field__button) {
  .van-button--mini {
    padding: 0 0.2rem;
  }
}
</style>
