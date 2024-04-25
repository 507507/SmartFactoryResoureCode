<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="主键ID" width="180" />
    <el-table-column prop="logger" label="日志发生地址" />
    <el-table-column prop="message" label="日志信息" />
    <el-table-column prop="exception" label="异常消息" />
    <el-table-column prop="date" label="时间" />
  </el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const tableData = ref([])
//请求webapi

onMounted(async () => {
  //加载请求api
  //发起请求axios
  var service = axios.create({ baseURL: 'http://localhost:5053/' })
  let response = await service.get('/SystemLog/1/2')
  let result = response.data
  tableData.value = result.dataList
})
</script>
