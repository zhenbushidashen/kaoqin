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
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
	if(this.getStatus() == BMAP_STATUS_SUCCESS){
		var mk = new BMap.Marker(r.point);
		map.addOverlay(mk);
		map.panTo(r.point);
		alert('您的位置：'+r.point.lng+','+r.point.lat);
	}
	else {
		alert('failed'+this.getStatus());
	}        
});
    window.setTimeout(function(){  
    map.panTo(new BMap.Point(116.409, 39.918));    
}, 2000)
  }
}
</script>

<style scoped>
  .map_container {
      width: 650px;
      height: 300px;
  }
</style>
