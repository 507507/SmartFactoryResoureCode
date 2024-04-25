<template>
  <div id="module">
    <el-container>
      <navMenu />
      <el-container>
        <el-header>
          <div class="breadcrumb">
            <breadcrumb />
          </div>
        </el-header>

        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import navMenu from '../components/navMenu.vue'
import breadcrumb from '../components/breadcrumb.vue'
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Message,
  Setting,
  ArrowRight
} from '@element-plus/icons-vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles'
}
const status = false
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>
