<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="v in list" :key="v.path">
      <router-link :to="v.path">{{ v.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'

const route = useRoute()
const list = ref([])

//监听
watch(route, (to, from) => {
  getBreadcrumb(to.matched)
})

onMounted(() => {
  getBreadcrumb(route.matched)
})

function getBreadcrumb(matched) {
  list.value = matched
}
</script>
