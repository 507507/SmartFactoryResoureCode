<template>
  <el-menu-item
    class="menu"
    :index="basePath"
    v-if="!item.child || item.child.length <= 0"
  >
    <el-icon> </el-icon>
    <span>{{ item.text }}</span>
  </el-menu-item>

  <el-sub-menu class="menu" :index="basePath" v-else>
    <template #title>
      <el-icon> </el-icon>
      <span>{{ item.text }}</span>
    </template>
    <NavItem
      v-for="sub in item.child"
      :key="sub.url"
      :item="sub"
      :basePath="sub.url"
    />
  </el-sub-menu>
</template>
<script setup>
import { ref, reactive } from 'vue'
const { item, basePath } = defineProps({
  item: {
    type: Object
  },
  basePath: {
    type: String
  }
})
</script>
