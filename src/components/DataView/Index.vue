<template>
  <div>
     <div>
          打卡时间：  
    <el-date-picker
      v-model="value7"
      type="datetimerange"
      align="right"
      start-placeholder="上班时间"
      end-placeholder="下班时间"
      :default-time="['12:00:00', '08:00:00']">
    </el-date-picker>
    <el-select v-model="signType" placeholder="请选择">
    <el-option value="1"></el-option>
    <el-option value="2"></el-option>
  </el-select>
  <el-button type="primary" @click="query">查询</el-button>
  <el-button type="primary" @click="expor">导出EXCEL</el-button>
  </div>  
  <div>
    <el-table
    :data="tableData"
    style="width: 100%">

    </el-table-column>
    <el-table-column
      prop="eName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="打卡时间"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="place"
      label="打卡地点"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="oName"
      label="组织"
      :formatter="formatter">
    </el-table-column>
    </el-table-column>
  </el-table>
  </div>
  
  </div>
</template>

<script>
export default {
   data() {
      return {
        signType: 1
        // value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        //  tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   tag: '家'
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄',
        //   tag: '公司'
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄',
        //   tag: '家'
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄',
        //   tag: '公司'
        // }]
      }
    },
     methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      query () {

      },
      export () {

      }
    }
}
</script>

<style>

</style>
