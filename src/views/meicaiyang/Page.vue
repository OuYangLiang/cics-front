<template>
    <a-layout style="min-height: 100vh">
        <Menu selectedKeys="meicaiyang"/>

        <a-layout >
            <Header />

            <div style="min-height: 80vh">
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
            </div>

            <Footer />
        </a-layout>
    </a-layout>
</template>
<script setup>
import Menu from '@/components/Menu.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TableComp from '@/views/meicaiyang/TableComp.vue';
import SearchComp from '@/views/meicaiyang/SearchComp.vue';
import Detail from '@/views/meicaiyang/Detail.vue';

import { ref, reactive } from 'vue'
import moment from 'moment';
const formState = reactive({ "page":1, "pageSize":10, uploadStatus:'', ywrqRange: [moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]})

const detailControl = reactive({"visible":false, "record": {}})

const mainTableRef = ref();

function searchEvent() {
    mainTableRef.value.search()
}

function viewDetail(param) {
    detailControl.record = param;
    detailControl.visible = true;
}
</script>