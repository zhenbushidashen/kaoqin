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
    <el-select v-model="value" placeholder="请选择">
    <el-option>上下班</el-option>
    <el-option>外出</el-option>
  </el-select>
  <el-button type="primary">查询</el-button>
  <el-button type="primary">导出EXCEL</el-button>
  </div>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%">

    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="打卡时间"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="address"
      label="打卡类型"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="address"
      label="打卡结果"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="address"
      label="备注"
      :formatter="formatter">
    </el-table-column>
  </el-table>
  </div>
  
  </div>
</template>

<script>
export default {
   data() {
      return {
        value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
         tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
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
      }
    }
}
</script>

<style>

</style>
