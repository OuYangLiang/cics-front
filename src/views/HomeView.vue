<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="data">
                    <!-- <pie-chart-outlined /> -->
                    <span><RouterLink to="/data">Data</RouterLink></span>
                </a-menu-item>
                
                <a-menu-item key="employee">
                    <!-- <desktop-outlined /> -->
                    <span><RouterLink to="/employee">Employee</RouterLink></span>
                </a-menu-item>

                <a-menu-item @click.prevent="logout" key="logout">
                    <!-- <desktop-outlined /> -->
                    <span>退出</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="background: #fff; padding: 0; text-align: center" >
                XXX管理系统
            </a-layout-header>

            <div v-if="selectedKeys == 'data'">
                <DataModule />
            </div>
            <div v-else-if="selectedKeys == 'employee'">
                <EmployeeModule />
            </div>
            <div v-else>
                error
            </div>

            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const collapsed = ref(false);
const selectedKeys = ref([route.params.menu]);

import EmployeeModule from './employee/ModuleView.vue';
import DataModule from './data/ModuleView.vue';
import router from '@/router';

function logout() {
    localStorage.removeItem('token');
    router.push('/login')
}
</script>
<style scoped>
.logo {
    height: 32px;
    margin: 16px;
    background: #898181;
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>