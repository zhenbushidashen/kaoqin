<template>
<div style="width: 100%;height: 430px;">
   <div id="r-result">请输入:<input type="text" id="suggestId" size="20" value="百度" style="width:150px;" /></div>
	<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
   <div class="map_container">
   </div>

</div>
  
</template>

<script>
import BMap from 'BMap'
import store from '../../store'
export default {
  name: 'map',
  mounted() {
//     var map = new BMap.Map(document.querySelector('.map_container'))
//     map.enableScrollWheelZoom(true)
    
//  //get position
//   map.addEventListener("dragend", function(){    
//     var center = map.getCenter();    
// })
// map.addEventListener("click", function(e){    
//     map.panTo(e.point);   
//     var marker = new BMap.Marker(e.point);        // 创建标注    
// map.addOverlay(marker); 

// });
//  var geolocation = new BMap.Geolocation();

//   geolocation.getCurrentPosition(function(r){
//     console.log(r)
// 	if(this.getStatus() == BMAP_STATUS_SUCCESS){
// 		var mk = new BMap.Marker(r.point);
// 		map.addOverlay(mk);
// 		map.panTo(r.point);
//     map.centerAndZoom(r.point, 15)
// 	} else {
// 		alert('定位失败'+this.getStatus());
// 	}        
// })
// // search start
// 	function G(id) {
// 		return document.getElementById(id);
// 	}
// 	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
// 		{"input" : "suggestId"
// 		,"location" : map
// 	});

// 	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
// 	var str = "";
// 		var _value = e.fromitem.value;
// 		var value = "";
// 		if (e.fromitem.index > -1) {
// 			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
// 		}    
// 		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
// 		value = "";
// 		if (e.toitem.index > -1) {
// 			_value = e.toitem.value;
// 			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
// 		}    
// 		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
// 		G("searchResultPanel").innerHTML = str;
// 	});

// 	var myValue;
// 	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
// 	var _value = e.item.value;
// 		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
// 		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
// 		setPlace();
// 	});

// 	function setPlace(){
// 		map.clearOverlays();    //清除地图上所有覆盖物
// 		function myFun(){
// 			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
// 			map.centerAndZoom(pp, 18);
// 			map.addOverlay(new BMap.Marker(pp));    //添加标注
// 		}
// 		var local = new BMap.LocalSearch(map, { //智能搜索
// 		  onSearchComplete: myFun
// 		});
// 		local.search(myValue);
// 	}
// // search end
	// 百度地图API功能
	function G(id) {
		return document.getElementById(id);
	}

	var map = new BMap.Map("map_container");
	map.centerAndZoom("北京",12);                   // 初始化地图,设置城市和地图级别。

	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "suggestId"
		,"location" : map
	});

	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
		setPlace();
	});

	function setPlace(){
		map.clearOverlays();    //清除地图上所有覆盖物
		function myFun(){
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			map.centerAndZoom(pp, 18);
			map.addOverlay(new BMap.Marker(pp));    //添加标注
		}
		var local = new BMap.LocalSearch(map, { //智能搜索
		  onSearchComplete: myFun
		});
		local.search(myValue);
	}
  }
}
</script>

<style>
  .map_container {
      width: 100%;
      height: 400px;
  }
</style>
