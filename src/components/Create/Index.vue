<template>
  <div style="padding: 30px;border: 1px solid rgba(103,194,58,.4); border-radius: 10px;box-shadow: 1px 2px 1px 1px #999;" v-loading="loading"
    element-loading-text="加载中...">
   <br>
  <br>
<label for="" style="font-weight:bold;">考勤部门: </label> 
 <el-input
  placeholder="点击右侧选择考勤组织"
  v-model="organization[0].oName"
  clearable
  style="width:50%;"
  :disabled="true" size="mini">
</el-input>
<el-button type="primary" icon="el-icon-edit" circle @click="contactTableVisible=true"></el-button>
  <br>
  <br>

<label for="" style="font-weight:bold;">办公地址: </label>

<el-input
  placeholder="点击右侧选择办公地址"
  v-model="place"
  clearable
  :disabled="true"
  style="width:50%;" size="mini">
</el-input>
<el-button type="primary" icon="el-icon-edit" circle @click="dialogTableVisible = true"></el-button>

  <br/>
  <br/>
  <label for="" style="font-weight:bold;">上班时间: </label>
 <!-- <el-time-picker
    v-model="signIn"
    format="HH时mm分"
    placeholder="请选择上班时间">
  </el-time-picker> -->
  <el-select v-model="startHour" placeholder="小时" style="width:80px;" size="mini">
     <el-option :value="hour" v-for="hour in 24" :key="hour" :label="hour|timeDouble"></el-option>
  </el-select> 时
    <el-select v-model="startMinute" placeholder="分钟" style="width:80px;" size="mini">
     <el-option :value="0" label="00"></el-option>      
     <el-option :value="minute" v-for="minute in 59" :key="minute" :label="minute|timeDouble"></el-option>
  </el-select> 分
  <br/>
  <br/>
  <label for="" style="font-weight:bold;">下班时间: </label>
  <el-select v-model="endHour" placeholder="小时" style="width:80px;" size="mini">
     <el-option :value="hour" v-for="hour in 24" :key="hour" :label="hour|timeDouble"></el-option>
  </el-select> 时
    <el-select v-model="endMinute" placeholder="分钟" style="width:80px;" size="mini">
      <el-option :value="0" label="00"></el-option>
     <el-option :value="minute" v-for="minute in 59" :key="minute" :label="minute|timeDouble"></el-option>
  </el-select> 分
   <br>
  <br>
  <label for="" style="font-weight:bold;">打卡范围: </label>
    <el-select v-model="radius" placeholder="请选择打卡范围" size="mini">
    <el-option label="50米" :value="50"></el-option>
    <el-option label="100米" :value="100"></el-option>
    <el-option label="200米" :value="200"></el-option>
    <el-option label="300米" :value="300"></el-option>
    <el-option label="500米" :value="500"></el-option>
    <el-option label="1000米" :value="1000"></el-option>
  </el-select>
  <br>
  <br>
  {{JSON.stringify(organization)}}
  <el-button @click="$router.go(-1)">取消返回</el-button>
  <el-button type="primary" @click="confirmCreate">{{$route.name === 'modify' ? '确认修改' : '立即创建'}}</el-button>

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
  <!-- <el-tree
      :data="orgInfo"
      show-checkbox
      @check="selectNode"
      :check-on-click-node="true"
      node-key="id"
      ref="tree"
      highlight-current
      >
</el-tree> -->
  <el-tree
    :data="organization"
    node-key="oId"
    @check="selectNode"
    :props="customProps"
    :default-expanded-keys="[10000000]"
    :check-strictly="true"
    :load="loadNode"
    ref="tree"
    :show-checkbox="true"
    lazy>
  </el-tree>
    <el-button @click="contactTableVisible=false">取消</el-button>
    <el-button type="primary" @click="confirmSelectOrg">确定</el-button>
</el-dialog>

  </div>
</template>

<script>
import AMap from '../AMap'
import store from '../../store'
import {getOriganationInfo} from '../../api'
export default {

  created() {
    const self = this
    getOriganationInfo({oId:this.organization.oId}).then(res => {
      
       this.orgInfo = res.data.map((val, idx) => {
          return {id: val.oId, label: val.oName, isLeaf: !!val.isLeaf, children: [{id: '123', label: '哈哈', isLeaf: false}]}
       })
    })
   if (this.$route.name === 'modify') {
     this.loading = true
     store.dispatch('GET_ATTENDANCEITEM', this.$route.params.ruleId).then(res => {
       self.radius = res.data.location.radius
       self.lng = res.data.location.longitude
       self.lat = res.data.location.latitude
       self.place = res.data.place
       self.startHour = +res.data.signIn.split(':')[0]
       self.startMinute = +res.data.signIn.split(':')[1]
       self.endHour = +res.data.signOut.split(':')[0]
       self.endMinute = +res.data.signOut.split(':')[1]
       this.loading = false
     })
   }
  },
  data() {
    let self = this
      return {
          i: 0,
          lng: 0,
          lat: 0, 
          place: '',
          dialogTableVisible: false,
          contactTableVisible: false,
          radius: '',
          currentSelectOrg: {},
          organization: [{oName: '新奥', oId: '10000000'}],
          orgInfo: [],
          markers: [],
          positionArray: [],
          searchOption: {
            city: '',
            citylimit: true
          },
          positionChecked: {},
          mapCenter: [121.59996, 31.197646],
          startHour: 9,
          startMinute: 0,
          endHour: 18,
          endMinute: 0,
          customProps: {
            label: 'oName',
            children: 'zones',
            isLeaf: 'leaf'
          },
          loading: false
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
    }
}) 
    },
    confirmSelectAddress () {
      this.place = `${this.positionChecked.name}(${this.positionChecked.address})`
      this.dialogTableVisible = false
    },
    confirmCreate() {
      const self = this
      if(!this.$data.place) {
        this.$message.error('请选择办公地点')
        return 
      }
      if(!this.signIn) {
        this.$message.error('请选择上班时间')
        return 
      }
      if(!this.signOut) {
        this.$message.error('请选择下班时间')
        return 
      }
       if(!this.$data.radius) {
        this.$message.error('请选择打卡范围')
        return 
      }      
      store.dispatch('CREATE_LOCATION', {
        place: this.place,
        latitude: this.lat,
        longitude: this.lng,
        radius: this.radius
      },err => {
          this.$message.success(err + '请联系技术人员')
        }).then(res => {
        store.dispatch('CREATE_RULE', {
          oId: self.organization[0].oId,
          locationId: res.data.id,
          signIn: self.signIn,
          signOut: self.signOut
        }).then(res => {
          this.$message.success('创建考勤成功')
          self.$router.push('/')
        }, err => {
          this.$message.success(err + '请联系技术人员')
        })
      })

    },
    selectNode (data, checked, node) {
      if (this.i % 2 === 0) {
        if (checked) {
         this.$refs.tree.setCheckedNodes([])
         this.$refs.tree.setCheckedNodes([data])
         } else {
           this.$refs.tree.setCheckedNodes([])
      }
    }
    this.currentSelectOrg = {oId: data.oId, oName: data.oName}
  },
  confirmSelectOrg () {
    if(!this.currentSelectOrg.oId) {
      this.$message.error('您还未选择组织')
    } else{ 
    this.organization = [this.currentSelectOrg]
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
        },
      loadNode(node, resolve) {
        console.log(node)
        const vue = this
        if (node.level === 0) {
          return resolve([{ oName: '新奥集团', oId: '10000000', disabled: false }])
        }
        setTimeout(() => {
          getOriganationInfo({oId:node.key}).then(res => {
            const result = res.data.map((val, idx) => {
              return {oName: val.oName, oId: val.oId, leaf: !!val.isLeaf}
            })
            resolve(result)
          })
        }, 500)
      },
  },
  computed: {
    signIn () {
      return (this.startHour > 10 ? this.startHour : '0' + this.startHour) + ':' + (this.startMinute > 10 ? this.startMinute : '0' + this.startMinute) + ':00'
    },
    signOut () {
      return (this.endHour > 10 ? this.endHour : '0' + this.endHour) + ':' + (this.endMinute > 10 ? this.endMinute : '0' + this.endMinute) + ':00'
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
