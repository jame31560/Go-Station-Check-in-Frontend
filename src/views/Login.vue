<template>
  <div class="container mt-4">
    <h1>登入</h1>
    <hr />

    <LoginForm />
  </div>
</template>

<script>
  import LoginForm from "@/components/LoginForm.vue";

  export default {
    components: {
      LoginForm
    },
    mounted() {}
  };
</script>
