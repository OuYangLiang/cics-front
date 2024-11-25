<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <!-- <a-menu-item key="data">
                    <span><RouterLink to="/data">Data</RouterLink></span>
                </a-menu-item>
                
                <a-menu-item key="employee">
                    <span><RouterLink to="/employee">Employee</RouterLink></span>
                </a-menu-item> -->

                <a-menu-item key="guidaoheng">
                    <!-- <desktop-outlined /> -->
                    <span><RouterLink to="/guidaoheng">轨道衡台账</RouterLink></span>
                </a-menu-item>

                <a-menu-item key="qichecheng">
                    <!-- <desktop-outlined /> -->
                    <span><RouterLink to="/qichecheng">汽车衡台账</RouterLink></span>
                </a-menu-item>

                <a-menu-item key="meicaiyang">
                    <!-- <desktop-outlined /> -->
                    <span><RouterLink to="/meicaiyang">汽车机械采样</RouterLink></span>
                </a-menu-item>

                <a-menu-item key="pidaimeicaiyang">
                    <!-- <desktop-outlined /> -->
                    <span><RouterLink to="/pidaimeicaiyang">皮带煤流采样</RouterLink></span>
                </a-menu-item>

                <a-menu-item key="meizhi">
                    <!-- <desktop-outlined /> -->
                    <span><RouterLink to="/meizhi">煤质数据台账</RouterLink></span>
                </a-menu-item>

                <a-menu-item key="huayandan">
                    <!-- <desktop-outlined /> -->
                    <span><RouterLink to="/huayandan">化验单台账</RouterLink></span>
                </a-menu-item>

                <!-- <a-menu-item key="kjhuayandan">
                    <span><RouterLink to="/kjhuayandan">煤质快检（明细数据）</RouterLink></span>
                </a-menu-item> -->
                
                
            </a-menu>
        </a-layout-sider>

        <a-layout >
            <a-layout-header style="background: #141414; color: #fff; padding: 0; text-align: center" >
                承德热电煤炭数据直连管控平台

                <div style="float:right; padding-right: 30px;" >
                    <a-button type="link" @click.prevent="logout">退出</a-button>
                </div>

                <div style="float:right; padding-right: 30px;" >
                    当前用户：{{ currentLogin }}
                </div>
            </a-layout-header>

            <!-- <div v-if="selectedKeys == 'data'">
                <DataModule />
            </div>
            <div v-else-if="selectedKeys == 'employee'">
                <EmployeeModule />
            </div> -->
            <div v-if="selectedKeys == 'guidaoheng'" style="min-height: 80vh">
                <GuidaohengModule />
            </div>
            <div v-else-if="selectedKeys == 'qichecheng'" style="min-height: 80vh">
                <QichechengModule />
            </div>
            <div v-else-if="selectedKeys == 'meicaiyang'" style="min-height: 80vh">
                <MeicaiyangModule />
            </div>
            <div v-else-if="selectedKeys == 'pidaimeicaiyang'" style="min-height: 80vh">
                <PidaimeicaiyangModule />
            </div>
            <div v-else-if="selectedKeys == 'meizhi'" style="min-height: 80vh">
                <MeizhiModule />
            </div>
            <div v-else-if="selectedKeys == 'huayandan'" style="min-height: 80vh">
                <HuayandanModule />
            </div>
            <!-- <div v-else-if="selectedKeys == 'kjhuayandan'" style="min-height: 80vh">
                <KjhuayandanModule />
            </div> -->
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

// import EmployeeModule from './employee/ModuleView.vue';
// import DataModule from './data/ModuleView.vue';
import GuidaohengModule from './guidaoheng/ModuleView.vue';
import QichechengModule from './qichecheng/ModuleView.vue';
import MeicaiyangModule from './meicaiyang/ModuleView.vue';
import PidaimeicaiyangModule from './pidaimeicaiyang/ModuleView.vue';
import MeizhiModule from './meizhi/ModuleView.vue';
import HuayandanModule from './huayandan/ModuleView.vue';
import KjhuayandanModule from './kjhuayandan/ModuleView.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
    localStorage.removeItem('token');
    router.push('/login')
}

const currentLogin = localStorage.getItem('currentLogin')
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