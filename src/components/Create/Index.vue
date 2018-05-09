<template>
  <div>
       <br>
  <br>
     <label for="">考勤部门</label> <el-input
  placeholder="请输入内容"
  v-model="input10"
  clearable>
</el-input>
 <br>
  <br>
<label for="">办公地址</label>
<el-input
  placeholder="请输入内容"
  v-model="input10"
  clearable>
</el-input>
 <br>
  <br>
<div class="block">
    <el-date-picker
      v-model="value7"
      type="datetimerange"
      align="right"
      start-placeholder="上班时间"
      end-placeholder="下班时间"
      :default-time="['12:00:00', '08:00:00']">
    </el-date-picker>
  </div>
   <br>
  <br>
    <el-select v-model="value" placeholder="请选择范围">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <br>
  <br>
  <el-button>取消返回</el-button>
  <el-button type="primary">立即创建</el-button>
  </div>
</template>

<script>
export default {
  data() {
      return {
          value7: ''
      }
  }
}
</script>

<style>

</style>
