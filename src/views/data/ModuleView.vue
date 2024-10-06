<template>
    <SearchComp @searchEvent="searchEvent"/>
    <a-divider />

    <TableComp ref="mainTableRef" :searchParam="formState"/>
</template>

<script setup>
    import TableComp from '@/views/data/TableComp.vue';
    import SearchComp from '@/views/data/SearchComp.vue';
    

    import { ref, reactive } from 'vue'

    const formState = reactive({ "page":1, "pageSize":10})

    const mainTableRef = ref();

    function searchEvent(param) {
        formState.department = param.department;
        formState.employeeNamePrefix = param.employeeNamePrefix;
        mainTableRef.value.search()
    }

</script>