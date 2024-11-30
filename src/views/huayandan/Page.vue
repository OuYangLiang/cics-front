<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
            
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <SearchComp @searchEvent="searchEvent" :formState="formState"/>

            <a-divider />

            <TableComp ref="mainTableRef" :searchParam="formState"  />
        </div>
    </a-layout-content>
    <Detail :detailControl="detailControl" />
</template>
<script setup>
import TableComp from '@/views/huayandan/TableComp.vue';
import SearchComp from '@/views/huayandan/SearchComp.vue';
import Detail from '@/views/huayandan/Detail.vue';

import { ref, reactive } from 'vue'
import moment from 'moment';
const formState = reactive({ "page":1, "pageSize":10, group:'', uploadStatus:'', ywrqRange: [moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]})

const detailControl = reactive({"visible":false, "record": {}})

const mainTableRef = ref();

function searchEvent() {
    mainTableRef.value.search()
}
</script>