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
    <BMap></BMap>
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
import BMap from '../BMap'
import http from '../../utils/request'
export default {
  components: {
    BMap
  },
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
      return {
          i: 0,
          place: '',
          signIn: '',
          signOut: '',
          dialogTableVisible: false,
          contactTableVisible: false,
          radius: '',
          currentSelectOrg: {},
          organization: {oName: '新奥', oId: '10000000'},
          orgInfo: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
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
  }
  }
}
</script>

<style>

</style>
