<template>
  <el-card class="box-card">
    <el-row>
      <el-form label-width="120px" style="max-width: 600px">
        <el-form-item label="时间范围">
          <el-date-picker
            arrow-control
            v-model="searchQuery.searchDateTime"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="请输入时间范围" /></el-form-item
      ></el-form>
      <el-button type="primary" @click="logQuery()">查询</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="主键ID" width="180" />
        <el-table-column prop="logger" label="日志发生地址" />
        <el-table-column prop="message" label="日志信息">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-popover
                :width="300"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>
                  {{ scope.row.message.substring(0, 20) }}
                </template>
                <template #default>
                  <div
                    class="demo-rich-conent"
                    style="display: flex; gap: 16px; flex-direction: column"
                  >
                    <div>
                      {{ scope.row.message }}
                    </div>
                  </div>
                </template>
              </el-popover>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="exception" label="异常消息">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-popover
                :width="300"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>
                  <!-- {{ scope.row.exception }} -->
                  {{ scope.row.exception.substring(0, 20) }}
                </template>
                <template #default>
                  <div
                    class="demo-rich-conent"
                    style="display: flex; gap: 16px; flex-direction: column"
                  >
                    <div>
                      {{ scope.row.exception }}
                    </div>
                  </div>
                </template>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="stringDateTime" label="时间" /> </el-table
    ></el-row>
  </el-card>

  <div class="pagination">
    <el-config-provider :locale="zhCn">
      <el-pagination
        layout="prev, pager, next,total,jumper,sizes"
        :total="searchQuery.total"
        :disabled="disabled"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        v-model:current-page="searchQuery.currentPage"
        v-model:page-size="searchQuery.pageSize"
        :page-sizes="[10, 20, 30, 40]"
      />
    </el-config-provider>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import axios from 'axios'
import service from '../../common/apiRequest'
//中文包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//列表数据绑定结果
const tableData = ref([])

const searchQuery = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  searchDateTime: []
})

//请求webapi

onMounted(async () => {
  logQuery()
})
//当pagesize的值发生改变时
const handleSizeChange = (number) => {
  logQuery()
}

//调用api加载数据
const logQuery = async () => {
  //加载请求api
  //发起请求axios
  var url = `/SystemLog/${searchQuery.value.currentPage}/${searchQuery.value.pageSize}`

  const searchDateQuery = searchQuery.value.searchDateTime
  console.log(searchDateQuery)
  if (searchDateQuery.length == 2) {
    var timestampStart = Date.parse(searchDateQuery[0])
    var timestampEnd = Date.parse(searchDateQuery[1])
    url = `/SystemLog/${searchQuery.value.currentPage}/${
      searchQuery.value.pageSize
    }/${timestampStart / 1000}
    /${timestampEnd / 1000}`
  }

  let response = await service.get(url)
  let result = response.data
  console.log(result.dataList)
  tableData.value = result.dataList
  searchQuery.value.total = result.recordCount
}

//点击选中某一页的时候会触发
const handleCurrentChange = (number) => {
  logQuery()
}
</script>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
