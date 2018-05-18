<template>
  <div>
       <br>
  <br>
<label for="">考勤部门</label> 
 <el-input
  placeholder="点击右侧选择考勤组织"
  v-model="organization.oName"
  clearable
  style="width:50%;"
  :disabled="true">
</el-input>
<el-button type="primary" icon="el-icon-edit" circle @click="contactTableVisible=true"></el-button>
  <br>
  <br>

<label for="">办公地址</label>

<el-input
  placeholder="点击右侧选择办公地址"
  v-model="place"
  clearable
  :disabled="true"
  style="width:50%;">
</el-input>
<el-button type="primary" icon="el-icon-edit" circle @click="dialogTableVisible = true"></el-button>

  <br>
  <br>
 <el-time-picker
    v-model="signIn"
    placeholder="请选择上班时间">
  </el-time-picker>
  <el-time-picker
    arrow-control
    v-model="signOut"
    placeholder="请选择下班时间">
  </el-time-picker>
   <br>
  <br>
    <el-select v-model="radius" placeholder="请选择打卡范围" >
    <el-option label="50米" :value="50"></el-option>
    <el-option label="100米" :value="100"></el-option>
    <el-option label="200米" :value="200"></el-option>
    <el-option label="300米" :value="300"></el-option>
    <el-option label="500米" :value="500"></el-option>
  </el-select>
  <br>
  <br>
  <el-button @click="$router.push('/')">取消返回</el-button>
  <el-button type="primary" @click="confirmChange">立即创建</el-button>
  <el-dialog title="选择办公地点" :visible.sync="dialogTableVisible">
    <!-- <BMap></BMap> -->
     <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo" :plugin="plugin">
        <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
      </el-amap>
    </div>
    {{lng}} {{lat}}
    <el-button @click="dialogTableVisible=false">取消</el-button>
    <el-button type="primary">确定</el-button>
</el-dialog>

  <el-dialog title="选择考勤部门" :visible.sync="contactTableVisible">
    <el-tree
  :data="orgInfo"
  show-checkbox
  @check="selectNode"
  :check-on-click-node="true"
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  >
</el-tree>
    <el-button @click="contactTableVisible=false">取消</el-button>
    <el-button type="primary" @click="confirmSelectOrg">确定</el-button>
</el-dialog>
<!-- {{new Date(signIn).getHours()+':'+ new Date(signIn).getMinutes()+':'+new Date(signIn).getSeconds()}}
{{new Date(signOut).getHours()+':'+ new Date(signOut).getMinutes()+':'+new Date(signIn).getSeconds()}} -->
  </div>
</template>

<script>
// import BMap from '../BMap'
import http from '../../utils/request'
export default {
  // components: {
  //   BMap
  // },
  created() {
    http.request({
      method: 'get',
      baseURL: 'http://183.196.130.125:9002/contact',
      url:'/org?pId=10000000'
    }).then(res => {
       this.orgInfo = res.data.map((val, idx) => {
          return {id: val.oId, label: val.oName, isLeaf: val.isLeaf}
       })
    })
  },
  data() {
    let self = this
      return {
          i: 0,
          lng: 0,
          lat: 0, 
          place: '',
          signIn: '',
          signOut: '',
          dialogTableVisible: false,
          contactTableVisible: false,
          radius: '',
          currentSelectOrg: {},
          organization: {oName: '新奥', oId: '10000000'},
          orgInfo: [],
          markers: [],
          searchOption: {
            city: '',
            citylimit: true
          },
          mapCenter: [121.59996, 31.197646],
           plugin: [{
            pName: 'Geolocation',
            
            events: {
              // init: function (o) {
              //   // o 是高德地图定位插件实例
              //   o.getCurrentPosition((status, result) => {
              //     if (result && result.position) {
              //       console.log(result)
              //       self.lng = result.position.lng;
              //       self.lat = result.position.lat;
              //       self.mapCenter = [self.lng, self.lat];
              //       self.$nextTick();
              //     }
              //   });
              // }
              'click': (e) => {
              alert('map clicked');
            }
            }
          }]
      }
  },
  methods: {
    confirmChange() {
      if(!this.$data.place) {
        this.$message.error('请选择办公地点')
        return 
      }
      if(!this.$data.signIn) {
        this.$message.error('请选择上班时间')
        return 
      }
      if(!this.$data.signOut) {
        this.$message.error('请选择下班时间')
        return 
      }
       if(!this.$data.radius) {
        this.$message.error('请选择打卡范围')
        return 
      }
    },
    selectNode (data, checked, node) {
      if(this.i%2==0){
        if(checked){
         this.$refs.tree.setCheckedNodes([]);
        this.$refs.tree.setCheckedNodes([data]);
                    //交叉点击节点
         }else{
           this.$refs.tree.setCheckedNodes([]);
            //点击已经选中的节点，置空
      }
    }
    this.currentSelectOrg = {oId: data.id, oName: data.label}
  },
  confirmSelectOrg () {
    if(!this.currentSelectOrg.oId) {
      this.$message.error('您还未选择组织')
    } else{ 
    this.organization = this.currentSelectOrg
    this.contactTableVisible = false
    }
  },
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
}
</script>

<style scoped>
   .amap-demo {
      height: 400px;
    }

    .search-box {
      position: absolute;
      top: 25px;
      left: 20px;
    }

    .amap-page-container {
      position: relative;
    }
</style>
