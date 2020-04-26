<template>
  <div class="container mt-4">
    <h1>註冊</h1>
    <hr />
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="register">
          <div
            class="alert alert-danger"
            v-if="is_error"
          >
            {{msg}}
          </div>
          <div
            class="alert alert-primary"
            v-if="is_done"
          >
            註冊成功，請登入
          </div>
          <div class="form-group">
            <label for="emailInput">電子信箱</label>
            <input
              type="email"
              class="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              v-model="email"
              required
              v-bind:class="{
            'is-invalid': email != '' && email_valid() == false,
            'is-valid': email_valid()
            }"
            />
            <div v-bind:class="{
            'invalid-feedback': email_valid() == false,
            'valid-feedback': email_valid()
            }">
              {{emailMsg}}
            </div>
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
          <div class="form-group">
            <label for="confirmPasswordInput">確認密碼</label>
            <input
              type="password"
              class="form-control"
              v-bind:class="{
            'is-invalid': confirmPassword_valid() == false,
            'is-valid': password != '' && confirmPassword_valid()
            }"
              id="confirmPasswordInput"
              v-model="confirmPassword"
              required
            />
            <div v-bind:class="{
            'invalid-feedback': confirmPassword_valid() == false,
            'valid-feedback': confirmPassword_valid()
            }">
              {{passwordMsg}}
            </div>
          </div>
          <div class="form-group">
            <label for="nickInput">暱稱</label>
            <input
              type="text"
              class="form-control"
              id="nickInput"
              v-model="nick"
              required
            />
          </div>
          <p class="text-center">
            <button
              type="submit"
              class="btn btn-primary mr-2"
            >
              立即註冊
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        is_done: false,
        nick: "",
        email: "",
        password: "",
        confirmPassword: "",
        is_error: false,
        msg: "",
        passwordMsg: "",
        emailMsg: ""
      };
    },
    watch: {
      confirmPassword(value) {
        if (this.confirmPassword_valid()) {
          this.passwordMsg = "看起來不錯";
        } else {
          this.passwordMsg = "與密碼不符";
        }
      },
      email(value) {
        if (this.email_valid()) {
          this.emailMsg = "看起來不錯";
        } else {
          this.emailMsg = "這看起來不是email";
        }
      }
    },
    methods: {
      confirmPassword_valid() {
        return this.password == this.confirmPassword;
      },
      email_valid() {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.email
        );
      },
      register() {
        this.$http.defaults.headers.common = {
          Authorization: `Bearer ${this.$store.state.token}`
        };
        this.$http
          .post("http://192.168.1.102:5000/register", {
            email: this.email,
            password: this.password,
            nick: this.nick
          })
          .then(
            res => {
              this.is_error = false;
              this.is_done = true;
              this.msg = "";
              this.email = "";
              this.password = "";
              this.confirmPassword = "";
              this.nick = "";
            },
            err => {
              this.is_error = true;
              this.msg = err.response.data.msg;
            }
          );
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      }
    },
    mounted() {
      if (this.isLogin) {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        };
        this.$http.defaults.headers.common = {
          Authorization: `Bearer ${this.$store.state.token}`
        };
        this.$http.get("http://192.168.1.102:5000/check_auth").then(
          res => {
            this.$router.replace("/");
          },
          err => {
            this.$store.commit("SET_AUTH", {
              token: null,
              isLogin: false
            });
          }
        );
      }
    }
  };
</script>

<style></style>
