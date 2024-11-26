<template>
    <a-layout style="min-height: 100vh">
        <Menu />

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
            </div>

            <Footer />
        </a-layout>
    </a-layout>
</template>
<script setup>
import Menu from '@/components/Menu.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TableComp from '@/views/user/TableComp.vue';
import SearchComp from '@/views/user/SearchComp.vue';

import { ref, reactive } from 'vue'
const formState = reactive({ "page":1, "pageSize":10})

const mainTableRef = ref();

function searchEvent() {
    mainTableRef.value.search()
}
</script>