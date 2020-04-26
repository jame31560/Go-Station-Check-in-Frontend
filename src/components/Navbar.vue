<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top "
  >
    <router-link to="/" class="navbar-brand">
      GoStation Recorder
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" tag="a" class="nav-link active">
            首頁
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link to="/login" tag="a" class="nav-link active">
            登入
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link to="/register" tag="a" class="nav-link active">
            註冊
          </router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <router-link to="/history" tag="a" class="nav-link active">
            踩點紀錄
          </router-link>
        </li>
        <!-- <li
          class="nav-item"
          v-if="isLogin"
        >
          <router-link
            to="/account"
            tag="a"
            class="nav-link active"
          >
            帳號資訊
          </router-link>
        </li> -->
        <li class="nav-item" v-if="isLogin">
          <a href="javascript:;" class="nav-link active" v-on:click="logout">
            登出
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.commit("SET_AUTH", {
        token: "",
        isLogin: false,
      });
    },
  },
  mounted() {},
};
</script>

<style></style>
