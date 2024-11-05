<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
            
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <SearchComp @searchEvent="searchEvent"/>

            <a-divider />

            <TableComp ref="mainTableRef" :searchParam="formState" @viewDetail="viewDetail" />
        </div>
    </a-layout-content>
    <Detail :detailControl="detailControl" />
</template>

<script setup>
    import TableComp from '@/views/qichecheng/TableComp.vue';
    import SearchComp from '@/views/qichecheng/SearchComp.vue';
    import Detail from '@/views/qichecheng/Detail.vue';
    
    import { ref, reactive } from 'vue'

    const formState = reactive({ "page":1, "pageSize":10})

    const detailControl = reactive({"visible":false, "record": {}})

    const mainTableRef = ref();

    function searchEvent(param) {
        formState.zmxdocNo = param.zmxdocNo;
        formState.sssjdw = param.sssjdw;
        formState.uploadStatus = param.uploadStatus;
        
        mainTableRef.value.search()
    }

    function viewDetail(param) {
        detailControl.record = param;
        detailControl.visible = true;
    }

</script>