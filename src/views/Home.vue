<template>
  <div class="home">
    <div
      class="map"
      id="map"
    ></div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        GoStations: [],
        map: null,
        location: {
          lat: null,
          lng: null
        },
        markers: [],
        marker_config: [],
        history: [],
        check_list: []
      };
    },
    methods: {
      initMap() {
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: this.location,
          zoom: 13,
          maxZoom: 20,
          minZoom: 1,
          streetViewControl: false,
          mapTypeControl: true
        });
        map: this.map;
      },
      content(location) {
        let result = "<div id='content'>";
        result += "</div>";
        return `
                                                                                                  <div id="content">
                                                                                                    <p v-if="1!=1" class="h5 font-weight-bolder">
                                                                                                    <b>
                                                                                                    ${
                                                                                                      JSON.parse(
                                                                                                        location[
                                                                                                          "LocName"
                                                                                                        ]
                                                                                                      )[
                                                                                                        "List"
                                                                                                      ][1][
                                                                                                        "Value"
                                                                                                      ]
                                                                                                    }
                                                                                                    </b>
                                                                                                    </p>
                                                                                                    <p>${
                                                                                                      location[
                                                                                                        "Id"
                                                                                                      ]
                                                                                                    }</p>
                                                                                                  </div>
                                                                                                `;
      }
    },
    mounted() {
      if (!("geolocation" in navigator)) {
        return;
      }
      navigator.geolocation.getCurrentPosition(pos => {
        this.location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        this.initMap();
        this.$http.defaults.headers.common = {};
        this.$http.get("https://webapi.gogoro.com/api/vm/list").then(res => {
          this.GoStations = res.data;
          const config = {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`
            }
          };
          this.$http.defaults.headers.common = {
            Authorization: `Bearer ${this.$store.state.token}`
          };
          this.$http
            .get("http://192.168.1.102:5000/history")
            .then(
              res => {
                return res.data.data;
              },
              err => {
                return [];
              }
            )
            .then(res => {
              this.history = res;
              console.log(this.history);
              this.history.forEach(record => {
                if (!this.check_list.includes(record["gostation_id"])) {
                  this.check_list.push(record["gostation_id"]);
                }
              });
              console.log(this.check_list);
              this.GoStations.forEach((location, idx) => {
                let icon = "";
                if (location["State"] == 1) {
                  if (this.check_list.includes(location["Id"])) {
                    icon = "https://img.icons8.com/color/35/000000/ok--v1.png";
                  } else {
                    icon =
                      "https://img.icons8.com/ios-filled/35/000000/marker.png";
                  }
                } else {
                  if (this.check_list.includes(location["Id"])) {
                    icon = "https://img.icons8.com/offices/35/000000/ok.png";
                  } else {
                    icon =
                      "https://img.icons8.com/material-two-tone/35/000000/marker.png";
                  }
                }
                const marker = new google.maps.Marker({
                  // 設定為該餐廳的座標
                  position: {
                    lat: location["Latitude"],
                    lng: location["Longitude"]
                  },
                  icon: icon,
                  map: this.map
                });
                this.markers[idx] = marker;
                // 建立訊息視窗
                const infowindow = new google.maps.InfoWindow({
                  content: this.content(location),
                  maxWidth: 200
                });
                // 綁定點擊事件監聽
                marker.addListener("click", () => {
                  infowindow.open(this.map, marker);
                });
              });
            });
        });
      });
    }
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
