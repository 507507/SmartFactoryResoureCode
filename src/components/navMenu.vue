<!-- 此组件用来封装左边菜单栏 -->
<template>
  <el-aside width="200px" class="aside">
    <el-scrollbar>
      <el-menu
        :default-active="route.path"
        exact
        class="el-menu-vertical-demo"
        router
      >
        <el-menu-item class="menu" index="/index" style="padding: 0px">
          <div
            style="
              width: 60%;
              padding-bottom: 30px;
              height: 80%;
              padding-left: 10px;
            "
          >
            <div
              style="
                width: 80%;
                padding-bottom: 30px;
                height: 80%;
                padding-left: 10px;
              "
            >
              <el-image id="myImage" :src="zhaoxiImage"></el-image>
            </div>
          </div>
        </el-menu-item>
        <NavItem v-for="v in items" :key="v.url" :item="v" :basePath="v.url">
        </NavItem>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavItem from './navItem.vue'
import zhaoxiImage from '../assets/images/朝夕智慧工厂.png'

const route = useRoute()
const items = reactive([
  {
    text: '首页',
    url: '/home/index',
    icon: 'HomeFilled'
  },
  {
    text: '员工同事',
    url: './user',
    icon: 'user',
    child: [
      {
        text: '员工管理',
        url: '/user/index',
        icon: 'Tools'
      }
    ]
  },
  {
    text: '考勤统计',
    url: '',
    icon: 'Compass',
    child: [
      {
        text: '个人考勤',
        url: '/user/info',
        icon: 'StarFilled'
      },
      {
        text: '考勤分析',
        url: '/user/analyse',
        icon: 'Grid'
      }
    ]
  },
  {
    text: '统计分析',
    url: '/user/info',
    icon: 'Notification'
  },
  {
    text: '系统管理',
    url: './system',
    icon: 'Menu',
    child: [
      {
        text: '系统日志',
        url: '/system/log',
        icon: 'Tools'
      }
    ]
  }
])
</script>
