<template>
  <div>
      <div>
            打卡时间：  
      <el-date-picker
        v-model="value7"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        size="mini">
      </el-date-picker>

      <el-select v-model="signType" placeholder="请选择" size="mini">
        <el-option :value="1" label="上下班"></el-option>
        <el-option :value="2" label="外出"></el-option>
      </el-select>
      <el-button type="primary" @click="query" size="mini">查询</el-button>
      <el-button type="primary" @click="exportExcel" size="mini">导出EXCEL</el-button>
    </div>  
   <div>
    <el-table
    style="width: 100%">

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
  </el-table>
   <el-button type="info" style="width: 100%;" @click="$router.go(-1)" class="el-icon-back"> 返回首页</el-button>
  </div>
  
  </div>
</template>

<script>
import {exportAttendanceExcel, searchAttendanceData} from '../../api'
export default {
   data() {
      return {
        signType: 1,
        tableData: [],
        value7: [],
        info: {},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        
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
        if (!this.value7.length) {
          this.$notify({
            type: 'warning',
            title: '提示',
            message: '请选择查询范围!',
            duration: 2000,
            position: 'top-right'
          })
          return
        }
        if (!this.signType) {
            this.$notify({
            type: 'warning',
            title: '提示',
            message: '请选择打卡类型!',
            duration: 2000,
            position: 'top-right'
          })
          return
        }
        const self = this
        const params = {oId: this.info.oId, locationId: this.info.locationId, startDate: this.value7[0].toJSON().slice(0,10), endDate: this.value7[1].toJSON().slice(0,10), signType: this.signType}
        console.log(params)
        searchAttendanceData(params).then(res => {
          self.tableData = res.data
        }, err => {
          this.$message.error(err)
        })
      },
      exportExcel () {
        exportAttendanceExcel({oId: this.info.oId})  
      }
    },
    created () {
      const self = this
      this.$store.dispatch('GET_ATTENDANCEITEM', this.$route.params.ruleId).then(res => {
        self.info = res.data
     })
    },
    computed: {
      // startDate () {
      //   return this.value7[0] && this.value7[0].slice(8)
      // }
    }
}
</script>

<style>

</style>
