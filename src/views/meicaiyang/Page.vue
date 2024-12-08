<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>汽车机械采样</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <SearchComp @searchEvent="searchEvent" @uploadEvent="uploadEvent" :formState="formState"/>

            <TableComp ref="mainTableRef" :searchParam="formState" @viewDetail="viewDetail" />
        </div>
    </a-layout-content>
    <Detail :detailControl="detailControl" />
</template>
<script setup>
import TableComp from '@/views/meicaiyang/TableComp.vue';
import SearchComp from '@/views/meicaiyang/SearchComp.vue';
import Detail from '@/views/meicaiyang/Detail.vue';

import { ref, reactive } from 'vue'
import moment from 'moment';
const formState = reactive({ "loading":false, "page":1, "pageSize":10, uploadStatus:'', ywrqRange: [moment().subtract(30, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]})

const detailControl = reactive({"visible":false, "record": {}})

const mainTableRef = ref();

function searchEvent() {
    mainTableRef.value.search()
}

function uploadEvent() {
    mainTableRef.value.upload()
}

function viewDetail(param) {
    detailControl.record = param;
    detailControl.visible = true;
}
</script>