<template>
    <a-layout-content style="margin: 0 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>用户管理</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <SearchComp @searchEvent="searchEvent" :formState="formState"/>

            <TableComp ref="mainTableRef" :searchParam="formState"  />
        </div>
    </a-layout-content>
</template>
<script setup>
import TableComp from '@/views/user/TableComp.vue';
import SearchComp from '@/views/user/SearchComp.vue';

import { ref, reactive } from 'vue'
const formState = reactive({ "page":1, "pageSize":15})

const mainTableRef = ref();

function searchEvent() {
    mainTableRef.value.search()
}
</script>