<template>
  <div class="container">
    <h1>註冊</h1>
    <hr />
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
        <div class="form-group">
          <label for="confirmPasswordInput">確認密碼</label>
          <input
            type="password"
            class="form-control"
            id="confirmPasswordInput"
            v-model="confirmPassword"
          />
        </div>
        <div class="form-group">
          <label for="emailInput">電子信箱</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="nickInput">暱稱</label>
          <input
            type="text"
            class="form-control"
            id="nickInput"
            v-model="nick"
          />
        </div>
        <p class="text-center">
          <a
            href="javascript:;"
            class="btn btn-primary mr-2"
            v-on:click="register()"
          >
            立即註冊
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
