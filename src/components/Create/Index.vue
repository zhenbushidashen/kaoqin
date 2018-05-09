<template>
  <div>
       <br>
  <br>
<label for="">考勤部门</label> 
 <el-input
  placeholder="请输入内容"
  v-model="input10"
  clearable
  style="width:50%;">
</el-input>
<el-button type="primary" icon="el-icon-edit" circle @click=""></el-button>
  <br>
  <br>

<label for="">办公地址</label>

<el-input
  placeholder="请输入内容"
  v-model="input10"
  clearable
  style="width:50%;">
</el-input>
<el-button type="primary" icon="el-icon-edit" circle @click="dialogTableVisible = true"></el-button>

  <br>
  <br>
  <el-time-picker
    is-range
    v-model="value4"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围">
  </el-time-picker>
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
  <el-dialog title="请选择办公地点" :visible.sync="dialogTableVisible">
    <Map></Map>
    <el-button>取消</el-button>
    <el-button type="primary">确定</el-button>
</el-dialog>
  </div>
</template>

<script>
import Map from '../Map'
export default {
  components: {
    Map
  },
  data() {
      return {
          value7: '',
          value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          dialogTableVisible: false
      }
  }
}
</script>

<style>

</style>
