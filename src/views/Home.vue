<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      GoStations: [],
    };
  },
  mounted() {
    this.$http.get("https://webapi.gogoro.com/api/vm/list").then((res) => {
      this.GoStations = res.data;
    });
  },
};
</script>
