<template>
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo" :events="giveExample">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker" :events="events" :key="index"></el-amap-marker>
      </el-amap>
    </div>
  </template>


  <script>
    export default  {
      data: function() {
        return {
          markers: [
          ],
          searchOption: {
            city: '',
          },
          placeSearch: null,
          mapCenter: [121.59996, 31.197646],
          giveExample: {
              'init': function (o) {
                  this.placeSearch= new AMap.PlaceSearch() 
              }.bind(this),
              'click': function (source) {
               source.placeSearch = this.placeSearch
               this.$emit('select', source)
              }.bind(this)
          },
          events: {
            'click': function (source) {
               source.placeSearch = this.placeSearch
               this.$emit('select', source)
            }.bind(this)
          }
        };
      },
      methods: {
        addMarker: function() {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push([lng, lat]);
        },
        onSearchResult(pois) {
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
        }
      }
    };
</script>


  <style>
    .amap-demo {
      height: 300px;
    }

    .search-box {
      position: absolute;
      top: 50px;
      left: 20px;
    }

    .amap-page-container {
        position: relative;
        width: 100%;
        height: 350px;
        margin-top: -50px;

    }
  </style>