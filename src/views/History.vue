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
        <tr
          :key="index"
          v-for="(h, index) in historys"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ gostations[h.gostation_id] }}</td>
          <td>
            {{ h.datetime | moment("YYYY年MM月DD日 HH:mm:ss") }}
          </td>
          <td>
            <a
              href="javascript:;"
              v-on:click="delete_record(h, index)"
              class="btn btn-danger btn-sm"
            >刪除紀錄</a>
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
        gostations: {}
      };
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      }
    },
    watch: {
      isLogin(val) {
        if (val == false) {
          this.$router.replace("/login");
        }
      }
    },
    methods: {
      delete_record(history, idx) {
        let text = "你確定要刪除以下記錄嗎?\n刪除後不得復原。\n\n";
        text += `地點：${this.gostations[history.gostation_id]}\n`;
        text += `時間：${this.$moment(history.datetime).format(
          "YYYY年MM月DD日 HH:mm:ss"
        )}\n`;
        if (confirm(text)) {
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
              this.$http
                .delete("http://192.168.1.102:5000/history/" + history.id)
                .then(
                  res => {
                    this.historys.splice(idx, 1);
                    alert("刪除成功");
                  },
                  err => {
                    this.$store.commit("SET_AUTH", {
                      token: "",
                      isLogin: false
                    });
                    this.$router.replace("/login");
                  }
                );
            },
            err => {
              this.$store.commit("SET_AUTH", {
                token: "",
                isLogin: false
              });
              this.$router.replace("/login");
            }
          );
        }
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
            this.$http.get("http://192.168.1.102:5000/history").then(res => {
              this.historys = res.data.data;
              console.log(this.historys);
              let result = {};
              this.$http.defaults.headers.common = {};
              this.$http
                .get("https://webapi.gogoro.com/api/vm/list")
                .then(res => {
                  let gostations = res.data;
                  gostations.forEach((gostation, idx) => {
                    result[gostation["Id"]] = JSON.parse(gostation["LocName"])[
                      "List"
                    ][1]["Value"];
                  });
                  this.gostations = result;
                });
            });
          },
          err => {
            this.$store.commit("SET_AUTH", {
              token: "",
              isLogin: false
            });
            this.$router.replace("/login");
          }
        );
      } else {
        this.$router.replace("/login");
      }
    }
  };
</script>

<style></style>
