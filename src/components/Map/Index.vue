<template>
   <div class="map_container">
     
   </div>
</template>

<script>
import BMap from 'BMap'
export default {
  name: 'map',
  mounted() {
    var map = new BMap.Map(document.querySelector('.map_container'))
    var point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
    window.setTimeout(function(){  
    map.panTo(new BMap.Point(116.409, 39.918));    
}, 2000)
  }
}
</script>

<style scoped>
  .map_container {
      width: 1000px;
      height: 500px;
  }
</style>
