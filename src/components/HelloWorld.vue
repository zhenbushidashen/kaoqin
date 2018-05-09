<template>
  <div class="hello">
   <el-button type="primary" @click="create">新增</el-button>
    <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="部门"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="上班时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="下班时间"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地点"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="address"
      label="状态"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
     <a href="#">考勤数据</a>
        <a href="#">修改</a>
        <a href="#"> 禁用</a>
        <a href="#"> 启用</a>
        <a href="#">删除</a>
      </template>
      
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import Map from './Map'
export default {
  data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      create () {
        this.$router.push('/create')
      }
    },
  components: {
    Map
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
