<template>
  <div>
    <header>
      <div class="login" v-if="isLogin">
        login
        <button @click="$router.push('/user')">编辑资料</button>
      </div>
      <div class="logout" v-else>logout</div>
    </header>
    <main>收藏、历史、消息通知、小智同学</main>
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
