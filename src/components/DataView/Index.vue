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
  
  </div>
</template>

<script>
export default {
   data() {
      return {
        value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
      }
    }
}
</script>

<style>

</style>
