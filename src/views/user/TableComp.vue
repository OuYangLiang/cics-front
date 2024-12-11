<template>
    <a-table :row-selection="rowSelection" rowKey="id" :columns="columns" :data-source="tableData.records" :pagination="pagination" :loading="loading" @change="handleTableChange" size="small" bordered >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation' && record.username != currentLogin">
            <a-popconfirm title="确认删除?" @confirm="onDelete(record.id)" >
                <a>删除</a>
            </a-popconfirm>
        </template>
      </template>
    </a-table>
</template>

<script setup>
import axios from 'axios'
import { reactive, defineExpose, computed, inject} from 'vue';
import { useRequest } from 'vue-request';
import { useRouter } from 'vue-router'
const cicsUrl = inject('cicsUrl')

const router = useRouter()
const props = defineProps({searchParam: Object})
defineExpose({search});
const emit = defineEmits(['viewDetail'])

const ajaxParam = reactive({
    method: 'post',
    url: cicsUrl + '/user/search',
    headers: {
        "Authorization":localStorage.getItem('token')
    },
    data: props.searchParam
})

const queryData = () => axios(ajaxParam);

const columns = [
  {
    title: '序号',
    dataIndex: 'seq',
    width: 50,
    align: 'center'
  },
  {
    title: '用户ID',
    dataIndex: 'id',

    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
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
            if (response.data.data.records.length > 0) {
                let i = (response.data.data.page - 1) * response.data.data.pageSize + 1;

                response.data.data.records.forEach(function(item) {
                    item.seq = i++;
                });
            }

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
    showSizeChanger: true,
    pageSizeOptions: ['10','20', '50', '100'],
    total: tableData.numOfRecords,
    current: tableData.page,
    pageSize: tableData.pageSize,
    showTotal: (total, range) => `${range[0]}-${range[1]} 条数据，共 ${total} 条`
}));

function search() {
    run()
}

const handleTableChange = (pag, filters, sorter) => {
    ajaxParam.data.page=pag.current;
    ajaxParam.data.pageSize=pag.pageSize;
    run()
};

const uploadState = reactive({
  selectedRowKeys: []
});

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    uploadState.selectedRowKeys = selectedRowKeys;
  }
};

const currentLogin = localStorage.getItem('currentLogin')

const removeUser = (data) => {
    axios({
        method: 'post',
        url: cicsUrl + '/user/remove',
        headers: {
            "Authorization":localStorage.getItem('token')
        },
        data: {"userId": data}
    }).then(function (response) {
        if (response.data.success) {
            search();
        } else {
            if (response.data.errorCode == 0) {
                router.push('/login');
            }

            notification.error({
                message: '错误',
                description: response.data.errorMsg,
                duration: 20,
            });
        }
    }).catch(function (error) {
        console.log(error);
        notification.error({
            message: '异常',
            description: response.data.errorMsg,
            duration: 20,
        });
    });
};

const onDelete = userId => {
    removeUser(userId);
};

</script>