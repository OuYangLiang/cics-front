<template>
    <a-layout-content style="margin: 0 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>煤质快检化验台账</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <SearchComp @searchEvent="searchEvent" @uploadEvent="uploadEvent" :formState="formState"/>

            <TableComp ref="mainTableRef" :searchParam="formState" />
        </div>
    </a-layout-content>
</template>
<script setup>
import TableComp from '@/views/kjhuayandan/TableComp.vue';
import SearchComp from '@/views/kjhuayandan/SearchComp.vue';

import { ref, reactive } from 'vue'
import moment from 'moment';
const formState = reactive({ "loading":false, "page":1, "pageSize":15, group:'', uploadStatus:'', ywrqRange: [moment().subtract(30, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]})

const mainTableRef = ref();

function searchEvent() {
    mainTableRef.value.search()
}

function uploadEvent() {
    mainTableRef.value.upload()
}
</script>