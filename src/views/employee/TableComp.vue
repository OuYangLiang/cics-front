<template>
  <a-table :columns="columns" :data-source="tableData.records" :pagination="pagination" :loading="tableData.loading" @change="handleTableChange" bordered>
    <template #title>Header</template>
    <template #footer>Footer</template>
  </a-table>
</template>

<script setup>
import axios from 'axios'
import { reactive, defineExpose } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  param: Object
})

defineExpose({
  refresh
});

const ajaxParam = reactive({
    method: 'post',
    url: 'http://localhost:8080/employee/search',
    headers: {
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjgyODM0MTksImlhdCI6MTcyODE5NzAxOSwidXNlcm5hbWUiOiJveWwifQ.1KVXY5ccqyFWD5gbmb5EKkWlSat5nAXCuxFjzenmzdY"
    },
    data: props.param
})

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    className: 'column-money',
    dataIndex: 'employeeName',
  },
  {
    title: '电话号码',
    className: 'column-money',
    dataIndex: 'phone',
  },
  {
    title: '部门',
    dataIndex: 'department',
  },
  {
    title: '薪水',
    dataIndex: 'salary',
  },
];

const tableData = reactive({
    numOfRecords: 20,
    page: 1,
    pageSize: 10,
    records: [],
    loading: false
})

const pagination = computed(() => ({
    total: tableData.numOfRecords,
    current: tableData.pagee,
    pageSize: tableData.pageSize,
}));

function refresh() {
    tableData.loading = true;
    axios(ajaxParam).then(function (response) {
        const resp = response.data;
        if (resp.success) {
            tableData.numOfRecords = resp.data.numOfRecords;
            tableData.page = resp.data.page;
            tableData.pageSize = resp.data.pageSize;
            tableData.records = resp.data.records;
        } else {
            alert(resp.errorMsg);
        }
    }).catch(function (error) {
        console.log(error);
    });
    tableData.loading = false;
}

const handleTableChange = (pag, filters, sorter) => {
    ajaxParam.data.page=pag.current;
    ajaxParam.data.pageSize=pag.pageSize;
    refresh()
};

refresh()
</script>