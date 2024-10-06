<template>
    <SearchComp @searchEvent="searchEvent"/>
    <a-divider />

    <TableComp ref="mainTableRef" :param="formState"/>
</template>

<script setup>
    import TableComp from '@/views/employee/TableComp.vue';
    import SearchComp from '@/views/employee/SearchComp.vue';
    

    import { ref, reactive } from 'vue'

    const formState = reactive({ "page":1, "pageSize":10})

    const mainTableRef = ref();

    function searchEvent(param) {
        formState.phoneNum = param.phoneNum;
        formState.department = param.department;
        formState.employeeNamePrefix = param.employeeNamePrefix;
        mainTableRef.value.refresh()
    }

</script>