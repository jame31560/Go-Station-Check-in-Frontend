<template>
  <div class="home">
    <GmapMap id="map" :center="center" :zoom="13" ref="gmap">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :icon="{
          url:
            icons[
              (m.state == 1 ? '' : 'fix-') +
                (isLogin ? (m.checked ? 'checked' : 'unchecked') : 'unchecked')
            ],
        }"
        @click="toggleInfoWindow(m, index)"
      />
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
        style="max-width: 250px"
      >
        <div v-if="infoContent">
          <p class="h5">
            <b>{{ infoContent.name }}</b>
          </p>
          <p class="h6">
            {{ infoContent.address }}
          </p>
          <p>
            {{ infoContent.state == 1 ? "正常營運中" : "建置/維護中" }}
          </p>
          <p v-if="isLogin" class="text-center">
            <a
              href="javascript:;"
              class="btn btn-success"
              v-on:click="checkin(infoContent.id)"
            >
              簽到
            </a>
          </p>
          <p class="text-center">
            <a
              class="btn-link"
              :href="
                'https://www.google.com.tw/maps/place/' +
                  infoContent.position.lat +
                  ',' +
                  infoContent.position.lng
              "
              target="_blank"
            >
              導航至此
            </a>
          </p>
        </div>
      </gmap-info-window>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      center: {
        lat: null,
        lng: null,
      },
      markers: [],
      infoContent: null,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      GoStations: [],
      // marker_config: [],
      history: [],
      check_list: [],
      icons: {
        "fix-checked": "https://img.icons8.com/offices/35/000000/ok.png",
        "fix-unchecked":
          "https://img.icons8.com/material-two-tone/35/000000/marker.png",
        checked: "https://img.icons8.com/color/35/000000/ok--v1.png",
        unchecked: "https://img.icons8.com/ios-filled/35/000000/marker.png",
      },
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    checkin(gostation_id) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      };
      this.$http.defaults.headers.common = {
        Authorization: `Bearer ${this.$store.state.token}`,
      };
      this.$http
        .post("http://192.168.1.102:5000/checkin", {
          gostation_id: gostation_id,
        })
        .then(
          (res) => {
            alert("簽到成功");
          },
          (err) => {
            this.$store.commit("SET_AUTH", {
              token: "",
              isLogin: false,
            });
            this.$router.replace("/login");
          }
        );
    },
  },
  mounted() {
    if (!("geolocation" in navigator)) {
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      this.center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      this.$http.defaults.headers.common = {};
      this.$http.get("https://webapi.gogoro.com/api/vm/list").then((res) => {
        this.GoStations = res.data;
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        };
        this.$http.defaults.headers.common = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        this.$http
          .get("http://192.168.1.102:5000/history")
          .then(
            (res) => {
              return res.data.data;
            },
            (err) => {
              return [];
            }
          )
          .then((res) => {
            this.history = res;
            this.history.forEach((record) => {
              if (!this.check_list.includes(record["gostation_id"])) {
                this.check_list.push(record["gostation_id"]);
              }
            });
            this.GoStations.forEach((location, idx) => {
              let marker = {
                // 設定為該餐廳的座標
                name: JSON.parse(location["LocName"])["List"][1]["Value"],
                address: JSON.parse(location["Address"])["List"][1]["Value"],
                time: location["AvailableTimeByte"],
                state: location["State"],
                position: {
                  lat: location["Latitude"],
                  lng: location["Longitude"],
                },
                checked: this.check_list.includes(location["Id"]),
                id: location["Id"],
              };
              this.$set(this.markers, idx, marker);
            });
          });
      });
    });
  },
};
</script>

<style scoped>
#map {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: calc(100vh - 56px);
}
.title {
  font-weight: 500;
  font-size: 20px;
}
</style>
