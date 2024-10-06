<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
            
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <SearchComp @searchEvent="searchEvent"/>

            <a-divider />

            <TableComp ref="mainTableRef" :searchParam="formState"/>
        </div>
    </a-layout-content>
</template>

<script setup>
    import TableComp from '@/views/employee/TableComp.vue';
    import SearchComp from '@/views/employee/SearchComp.vue';
    

    import { ref, reactive } from 'vue'

    const formState = reactive({ "page":1, "pageSize":10})

    const mainTableRef = ref();

    function searchEvent(param) {
        formState.department = param.department;
        formState.employeeNamePrefix = param.employeeNamePrefix;
        mainTableRef.value.search()
    }

</script>