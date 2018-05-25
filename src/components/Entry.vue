<template>
  <div class="hello">
   <el-button type="primary" @click="create">添加考勤</el-button>
    <el-table
    :data="$store.state.attendanceItems"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="oName"
      label="部门"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="signIn"
      label="上班时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="signOut"
      label="下班时间"
      >
    </el-table-column>
    <el-table-column
      prop="place"
      label="地点"
      >
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
     >
      <template slot-scope="scope">
        <span>{{scope.row.status ? '启用' : '禁用'}}</span>

      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
     <router-link :to="{path: `/dataview/${scope.row.locationId}`}">考勤数据</router-link>
     <router-link :to="{path: `/modify/${scope.row.ruleId}`}">修改</router-link>
        <a href="javascript:;" @click="enableDisableItem(scope.row.status, scope.row.ruleId)">{{scope.row.status ? '禁用' : '启用'}}</a>
        <a href="javascript:;" @click="deleteItem(scope.row.locationId)">删除</a>
      </template>
    </el-table-column>
  </el-table>
  {{$store.state.attendanceItems}}
  </div>
</template>

<script>
import store from '../store'
export default {
  created() {
    store.dispatch('GET_ATTENDANCEITEMS')
    .then(res => {
      store.commit('INIT_ATTENDANCEITEMS', res.data)
    }, err => {
      this.$message.error(err)
    })
  },
  data() {
      return {
      } 
    },
    methods: {
      create () {
        this.$router.push('/create')
      },
      deleteItem(locationId) {
        this.$confirm('确定删除此条考勤规则?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('DELETE_ATTENDANCEITEM', locationId)
          .then(res => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          }, err =>{
            this.$message({
            type: 'error',
            message: err
          })
          })
          })
      
        })
      },
      enableDisableItem (status, id) {
        if(status) {
          store.dispatch('CLOSE_ATTENDANCEITEM',id).then(res => {
            store.commit('UPDATE_ATTENDANCEITEM', {locationId: id, key: 'status', value: false})
            this.$message.success('禁用成功')
          })
        } else {
          store.dispatch('OPEN_ATTENDANCEITEM', id).then(res => {
            store.commit('UPDATE_ATTENDANCEITEM', {locationId: id, key: 'status', value: true})
            this.$message.success('开启成功')
          })
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
