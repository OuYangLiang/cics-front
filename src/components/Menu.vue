<template>
<a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">

        <a-menu-item key="guidaoheng">
            <PicRightOutlined />
            <span><RouterLink to="/guidaoheng">轨道衡台账</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="qichecheng">
            <CarOutlined />
            <span><RouterLink to="/qichecheng">汽车衡台账</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="meicaiyang">
            <InsertRowBelowOutlined />
            <span><RouterLink to="/meicaiyang">汽车机械采样</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="pidaimeicaiyang">
            <DownloadOutlined />
            <span><RouterLink to="/pidaimeicaiyang">皮带煤流采样</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="meizhi">
            <AuditOutlined />
            <span><RouterLink to="/meizhi">煤质数据台账</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="huayandan">
            <ExperimentOutlined />
            <span><RouterLink to="/huayandan">化验单台账</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="user">
            <UsergroupAddOutlined />
            <span><RouterLink to="/user">用户管理</RouterLink></span>
        </a-menu-item>
    </a-menu>
</a-layout-sider>
</template>

<script setup>
import { PicRightOutlined, InsertRowBelowOutlined, DownloadOutlined, ExperimentOutlined, AuditOutlined, UsergroupAddOutlined, CarOutlined } from '@ant-design/icons-vue';

import { ref } from 'vue';
const collapsed = ref(false);

const props = defineProps({selectedKeys: String})
const selectedKeys = ref([props.selectedKeys]);
</script>

<style scoped>
.logo {
    height: 50px;
    margin: 16px;
    /* background: #898181; */
}

.ant-layout-sider {
    background: #002140;
}

.ant-menu-dark {
    background: #002140;
}



div.ant-layout-sider-trigger {
    background: #002140;
}
</style>