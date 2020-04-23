<template>
  <div class="card">
    <div class="card-body">
      <div class="form-group">
        <label for="usernameInput">帳號</label>
        <input
          type="text"
          class="form-control"
          id="usernameInput"
          aria-describedby="username-help"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="passwordInput">密碼</label>
        <input
          type="password"
          class="form-control"
          id="passwordInput"
          v-model="password"
        />
      </div>
      <p class="text-right">
        <router-link to="/forgetpassword" class="btn-link">
          忘記密碼
        </router-link>
      </p>
      <p class="text-center">
        <router-link to="/register" class="btn btn-link">
          還沒有帳號?點我註冊
        </router-link>
        <a href="javascript:;" class="btn btn-primary mr-2" v-on:click="login()"
          >登入</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      error: false,
      msg: "",
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username == "" || this.password == "") {
        this.error = true;
        this.msg = "帳號及密碼不得空白";
      } else {
        this.$store.commit("SET_AUTH", {
          token: "123",
          is_login: true,
        });
        this.$router.replace("/");
      }
    },
  },
};
</script>

<style scoped></style>
