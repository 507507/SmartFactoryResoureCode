<template>
  <el-card class="box-card">
    <el-row>
      <el-form label-width="120px" style="max-width: 600px">
        <el-form-item label="时间范围">
          <el-input
            v-model="searchQuery.serachString"
            label="关键字"
            placeholder="姓名，身份证号码" /></el-form-item
      ></el-form>
      <el-button type="primary" @click="FnQuery()">查询</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="员工ID" width="100" />
        <el-table-column prop="userName" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="80"> </el-table-column>
        <el-table-column prop="sexTypeDescription" label="性别" width="100">
        </el-table-column>
        <el-table-column prop="currentAddress" label="当前所在地" width="150">
        </el-table-column>
        <el-table-column prop="homeAddress" label="户籍所在地" width="150" />

        <el-table-column prop="idNumber" label="身份证号"> </el-table-column>
        <el-table-column
          prop="stringEntryTime"
          label="入职时间"
        ></el-table-column>
        <el-table-column prop="passWord" label="密码"> </el-table-column>
        <el-table-column prop="jobStatusDescription" label="在职描述">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-popover
                :width="300"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>
                  <!-- {{ scope.row.exception }} -->
                  {{ scope.row.jobStatusDescription }}
                </template>
                <template #default>
                  <div
                    class="demo-rich-conent"
                    style="display: flex; gap: 16px; flex-direction: column"
                  >
                    <div>
                      {{ scope.row.JobStatusDescription }}
                    </div>
                  </div>
                </template>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
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
  serachString: ''
})

//请求webapi

onMounted(async () => {
  FnQuery()
})
//当pagesize的值发生改变时
const handleSizeChange = (number) => {
  FnQuery()
}

//调用api加载数据
const FnQuery = async () => {
  //加载请求api
  //发起请求axios
  var url = `/User/${searchQuery.value.currentPage}/${searchQuery.value.pageSize}`
  if (searchQuery.value.serachString != '') {
    url = `/User/${searchQuery.value.currentPage}/${searchQuery.value.pageSize}/${searchQuery.value.serachString}`
  }

  let response = await service.get(url)
  let result = response.data
  console.log(result)
  tableData.value = result.data.dataList
  searchQuery.value.total = result.data.recordCount
}

//点击选中某一页的时候会触发
const handleCurrentChange = (number) => {
  FnQuery()
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
