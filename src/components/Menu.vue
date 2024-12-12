<template>
<a-layout-sider v-model:collapsed="collapsed" collapsible theme="light">
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">

        <a-sub-menu key="config">
            <template #title>
                <span>
                    <SettingOutlined />
                    <span>基础管理</span>
                </span>
            </template>
            <a-menu-item key="setting">
                <FormOutlined />
                <span><RouterLink to="/setting">配置管理</RouterLink></span>
            </a-menu-item>
            <a-menu-item key="user">
                <UsergroupAddOutlined />
                <span><RouterLink to="/user">用户管理</RouterLink></span>
            </a-menu-item>
        </a-sub-menu>

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
            <ExperimentOutlined />
            <span><RouterLink to="/meizhi">煤质数据台账</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="huayandan">
            <SolutionOutlined />
            <span><RouterLink to="/huayandan">化验单台账</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="kjhuayandan">
            <AuditOutlined />
            <span><RouterLink to="/kjhuayandan">煤质快检化验台账</RouterLink></span>
        </a-menu-item>

        <a-menu-item key="">
            <IeOutlined />
            <span @click="goOut" >燃料智能化管控系统</span>
        </a-menu-item>
    </a-menu>
</a-layout-sider>
</template>

<script setup>
import { PicRightOutlined, InsertRowBelowOutlined, DownloadOutlined, ExperimentOutlined, AuditOutlined, SettingOutlined, CarOutlined, SolutionOutlined, UsergroupAddOutlined, FormOutlined, IeOutlined } from '@ant-design/icons-vue';

import { ref } from 'vue';
const collapsed = ref(true);

const props = defineProps({selectedKeys: String})
const selectedKeys = ref([props.selectedKeys]);

function goOut() {
    window.location.href="http://10.157.3.133/grm/fuel.portal/mis/login/login.html"
}
</script>

