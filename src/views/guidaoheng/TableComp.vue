<template>
  <a-table :columns="columns" :data-source="tableData.records" :pagination="pagination" :loading="loading" @change="handleTableChange" size="small" bordered>
      <!-- <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'zmxdocNo'">
              <a @click.prevent="viewDetail(record)">{{ record.zmxdocNo }}</a>
          </template>
      </template> -->
      
      <template #action="{ column, record }" >
          <a @click.prevent="viewDetail(record)">数据详情</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确认上报吗?" @confirm="upload(record.zmxdocNo)" >
              <a>上报数据</a>
          </a-popconfirm>
      </template>
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
    url: 'http://localhost:8080/guidaoheng/search',
    headers: {
        "Authorization":localStorage.getItem('token')
    },
    data: props.searchParam
})

const queryData = () => axios(ajaxParam);

const columns = [
  {
    title: '明细磅单号',
    dataIndex: 'zmxdocNo',
    align: 'center'
  },
  {
    title: '所属二级公司',
    dataIndex: 'ssejdw',
    align: 'center'
  },
  {
    title: '所属三级公司',
    dataIndex: 'sssjdw',
    align: 'center'
  },
  {
    title: '上报状态',
    dataIndex: 'uploadStatus',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: '',
    align: 'center',
    slots: {
      customRender: 'action',
    },
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

function upload(param) {
    alert(param);
}
</script>