<template>
  <div class="history container mt-4">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">換電站</th>
          <th scope="col">採點時間</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(h, index) in historys">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ h.gostation_id }}</td>
          <td>
            {{ h.datetime | moment("YYYY年MM月DD日 HH:mm:ss") }}
          </td>
          <td>
            <a
              href="javascript:;"
              v-on:click="delete h.id"
              class="btn btn-danger btn-sm"
              >刪除紀錄</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      historys: [],
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    addEight(value) {
      let date = new Date(value);
      date.setTime(date.getTime() + 8 * 60 * 60 * 1000);
      return date;
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
          this.$http.get("http://192.168.1.102:5000/history").then((res) => {
            this.historys = res.data.data;
            console.log(this.historys);
          });
        },
        (err) => {
          this.$store.commit("SET_AUTH", {
            token: "",
            isLogin: false,
          });
          this.$router.replace("/login");
        }
      );
    }
  },
};
</script>

<style></style>
