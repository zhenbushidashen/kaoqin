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

  <el-dialog title="选择办公地点" :visible.sync="dialogTableVisible" width="90%">

    <div class="map-container">
     <div style="flex:80;">
      <AMap @select="select"></AMap>        
     </div>
    <div style="flex:20;">
      
  <el-radio-group v-model="positionChecked">
    <div v-if="position && position.address" style="margin: 10px 0px 10px 20px;" v-for="(position, index) in positionArray" :key="index">
    <el-radio  v-if="position && position.address" :label="position"> {{position.name}} &nbsp;({{position.address}}) </el-radio>
    <br>
    
    </div>
  </el-radio-group>
    </div>
 <div>
</div>
</div>
    <div style="display:flex;justify-content:flex-end; padding-right: 20%;">
      {{positionChecked}}
   <el-button @click="dialogTableVisible=false">取消</el-button>
    <el-button type="primary" @click="confirmSelectAddress" :disabled="!positionChecked.address || !positionChecked.location">确定</el-button>
    </div>
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

  </div>
</template>

<script>
import http from '../../utils/request'
import AMap from '../AMap'
export default {

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
          positionArray: [],
          searchOption: {
            city: '',
            citylimit: true
          },
          positionChecked: {},
          mapCenter: [121.59996, 31.197646]
      }
  },
  components: {
    AMap
  },
  methods: {
    select (source) {
      const {lat, lng} = source.lnglat
      const self = this
      source.placeSearch.searchNearBy("", [lng, lat], 500, function(status, result) {
    if (status === 'complete' && result.info === 'OK') {
      
        self.positionArray = result.poiList.pois
        console.log(self.positionArray)
    }
}) 
    },
    confirmSelectAddress () {
      this.place = `${this.positionChecked.name}(${this.positionChecked.address})`
      this.dialogTableVisible = false
    },
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
  selectMarker (e) {
    alert(JSON.stringify(e))
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
    .map-container {
      width: 100%;
      height: 400px;
      display: flex;
    }
</style>
