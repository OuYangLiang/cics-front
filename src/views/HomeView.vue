<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <!-- <pie-chart-outlined /> -->
                    <span>Option 1</span>
                </a-menu-item>
                
                <a-menu-item key="2">
                    <!-- <desktop-outlined /> -->
                    <span>Option 2</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="background: #fff; padding: 0; text-align: center" >
                XXX管理系统
            </a-layout-header>

            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    
                    <ModuleView />
                </div>
            </a-layout-content>

            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { ref } from 'vue';
const collapsed = ref(false);
const selectedKeys = ref(['1']);

import ModuleView from './employee/ModuleView.vue';
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