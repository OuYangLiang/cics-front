<template>
  <a-table :columns="columns" :data-source="tableData.records" :pagination="pagination" :loading="loading" @change="handleTableChange" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'employeeName'">
          <a @click.prevent="viewDetail(record)">{{ record.employeeName }}</a>
        </template>
      </template>
      <template #title>Header</template>
      <template #footer>Footer</template>
  </a-table>
</template>

<script setup>
import axios from 'axios'
import { reactive, defineExpose, computed} from 'vue';
import { useRequest } from 'vue-request';
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({searchParam: Object})
defineExpose({search});
const emit = defineEmits(['viewDetail'])

const ajaxParam = reactive({
    method: 'post',
    url: 'http://localhost:8080/employee/search',
    headers: {
        "Authorization":localStorage.getItem('token')
    },
    data: props.searchParam
})

const queryData = () => axios(ajaxParam);

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 1,
    align: 'center'
  },
  {
    title: '姓名',
    className: 'column-money',
    key: 'employeeName',
    dataIndex: 'employeeName',
    align: 'center'
  },
  {
    title: '电话号码',
    className: 'column-money',
    dataIndex: 'phone',
    align: 'center'
  },
  {
    title: '部门',
    dataIndex: 'department',
    align: 'center'
  },
  {
    title: '数字123',
    dataIndex: 'salary',
    align: 'center'
  },
];

const tableData = reactive({
    numOfRecords: 20,
    page: 1,
    pageSize: 10,
    records: []
})

const {
    run,
    loading
} = useRequest(queryData, {
    onSuccess: (response, params) => {
        if (response.data.success) {
            tableData.numOfRecords = response.data.data.numOfRecords;
            tableData.page = response.data.data.page;
            tableData.pageSize = response.data.data.pageSize;
            tableData.records = response.data.data.records;
        } else {
            alert(response.data.errorMsg);
            if (response.data.errorCode == 0) {
              router.push('/login');
            }
        }
    },
    onError: (error, params) => {
        console.log(error);
        alert(error);
    }
});

const pagination = computed(() => ({
    total: tableData.numOfRecords,
    current: tableData.pagee,
    pageSize: tableData.pageSize,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
}));

function search() {
    run()
}

const handleTableChange = (pag, filters, sorter) => {
    ajaxParam.data.page=pag.current;
    ajaxParam.data.pageSize=pag.pageSize;
    run()
};

function viewDetail(param) {
    try {
        emit("viewDetail", param);
    } catch (e) {
        console.log(e);
    }
}
</script>