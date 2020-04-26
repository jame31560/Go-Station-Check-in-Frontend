<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="login">
        <div class="alert alert-danger" v-if="error">
          {{ msg }}
        </div>
        <div class="alert alert-primary" v-if="prop_msg">
          {{ prop_msg }}
        </div>
        <div class="form-group">
          <label for="emailInput">電子信箱</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="email-help"
            v-model="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="passwordInput">密碼</label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            v-model="password"
            required
          />
        </div>
        <p class="text-right">
          <!-- <router-link
            to="/forgetpassword"
            class="btn-link"
          >
            忘記密碼
          </router-link> -->
        </p>
        <p class="text-center">
          <router-link to="/register" class="btn btn-link">
            還沒有帳號?點我註冊
          </router-link>
          <button type="submit" class="btn btn-primary mr-2">
            登入
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  props: ["prop_msg"],
  data() {
    return {
      error: false,
      msg: "",
      email: "",
      password: "",
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    login() {
      if (this.username == "" || this.password == "") {
        this.error = true;
        this.msg = "帳號及密碼不得空白";
      } else {
        this.$http
          .post("http://192.168.1.102:5000/login", {
            email: this.email,
            password: this.password,
            keep_login: true,
          })
          .then(
            (res) => {
              this.$store.commit("SET_AUTH", {
                token: res.data.access_token,
                isLogin: true,
              });
              this.error = false;
              this.msg = "";
              this.$router.replace("/");
            },
            (err) => {
              this.error = true;
              this.msg = err.response.data.msg;
            }
          );

        // this.$router.replace("/");
      }
    },
  },
  mounted() {
    if (this.isLogin) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      };
      this.$http.defaults.headers.common = {
        Authorization: `Bearer ${this.$store.state.token}`,
      };
      this.$http.get("http://192.168.1.102:5000/check_auth").then(
        (res) => {
          this.$router.replace("/");
        },
        (err) => {
          this.$store.commit("SET_AUTH", {
            token: "",
            isLogin: false,
          });
        }
      );
    }
  },
};
</script>

<style scoped></style>
