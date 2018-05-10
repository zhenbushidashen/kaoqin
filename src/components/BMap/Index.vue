<template>
   <div class="map_container">
   </div>
</template>

<script>
import BMap from 'BMap'
import store from '../../store'
export default {
  name: 'map',
  mounted() {
    var map = new BMap.Map(document.querySelector('.map_container'))
    map.enableScrollWheelZoom(true)
    
 //get position
  map.addEventListener("dragend", function(){    
    var center = map.getCenter();    
})
map.addEventListener("click", function(e){    
    map.panTo(e.point);   
    var marker = new BMap.Marker(e.point);        // 创建标注    
map.addOverlay(marker); 
});
 var geolocation = new BMap.Geolocation();

  geolocation.getCurrentPosition(function(r){
    console.log(r)
	if(this.getStatus() == BMAP_STATUS_SUCCESS){
		var mk = new BMap.Marker(r.point);
		map.addOverlay(mk);
		map.panTo(r.point);
    map.centerAndZoom(r.point, 15)
	} else {
		alert('定位失败'+this.getStatus());
	}        
})
  }
}
</script>

<style scoped>
  .map_container {
      width: 100%;
      height: 400px;
  }
</style>
