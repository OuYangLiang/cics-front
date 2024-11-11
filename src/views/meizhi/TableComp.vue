<template>
  <a-popconfirm title="确认上报吗?" @confirm="upload()" >
      <a-button type="primary" :disabled="!hasSelected" :loading="uploadState.loading" >
        上传
      </a-button>
  </a-popconfirm>
  <a-divider />
  <a-table :row-selection="rowSelection" rowKey="id" :columns="columns" :scroll="{ x: 1500, y: 400 }" :data-source="tableData.records" :pagination="pagination" :loading="loading" @change="handleTableChange" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'mybs'">
          <a @click.prevent="viewDetail(record)">{{ record.mybs }}</a>
        </template>
        <template v-if="column.dataIndex === 'uploadTime'">
          {{ format(record.uploadTime) }}
        </template>
      </template>
  </a-table>
</template>

<script setup>
import axios from 'axios'
import { reactive, defineExpose, computed, toRefs} from 'vue';
import { useRequest } from 'vue-request';
import { useRouter } from 'vue-router'
import moment from 'moment';

const router = useRouter()
const props = defineProps({searchParam: Object})
defineExpose({search});
const emit = defineEmits(['viewDetail'])

const ajaxParam = reactive({
    method: 'post',
    url: 'http://localhost:8080/meizhi/search',
    headers: {
        "Authorization":localStorage.getItem('token')
    },
    data: props.searchParam
})

const queryData = () => axios(ajaxParam);

const columns = [
  {
    title: '批次煤样标识',
    dataIndex: 'mybs',
    width: 100,
    align: 'center'
  },
  {
    title: '上报状态',
    width: 100,
    dataIndex: 'uploadStatusDesc',
    align: 'center'
  },
  {
    title: '上报时间',
    width: 100,
    dataIndex: 'uploadTime',
    align: 'center'
  },
  {
    title: '上报人',
    width: 100,
    dataIndex: 'operator',
    align: 'center'
  },
  {
    title: '所属二级公司',
    dataIndex: 'ssejdw',
    width: 100,
    align: 'center'
  },
  {
    title: '所属三级公司',
    width: 100,
    dataIndex: 'sssjdw',
    align: 'center'
  }
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

function format(param) {
    return null == param ? '' : moment(param).format('YYYY-MM-DD');
}

const uploadState = reactive({
  selectedRowKeys: [],
  loading: false
});

const hasSelected = computed(() => uploadState.selectedRowKeys.length > 0);

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    uploadState.selectedRowKeys = selectedRowKeys;
  }
};

import { notification } from 'ant-design-vue';
const upload = () => {
    uploadState.loading = true;
    axios({
        method: 'post',
        url: 'http://localhost:8080/meizhi/upload',
        headers: {
            "Authorization":localStorage.getItem('token')
        },
        data: {
            ids: uploadState.selectedRowKeys,
            operator: '欧'
        }
    }).then(function (response) {
        const resp = response.data;
        if (resp.success) {
            notification.success({
                message: '上报成功',
                description: '上报成功',
                duration: 2,
            });
        } else {
            notification.error({
                message: '错误',
                description: resp.errorMsg,
                duration: 2,
            });
        }
        search();
        uploadState.loading = false;
    }).catch(function (error) {
        uploadState.loading = false;
        console.log(error);
    });
};

</script>



