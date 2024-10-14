<template>
  <a-table :columns="columns" :scroll="{ x: 1500, y: 300 }" :data-source="tableData.records" :pagination="pagination" :loading="loading" @change="handleTableChange" size="small" bordered>
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
    title: '操作',
    width: 200,
    dataIndex: '',
    align: 'center',
    slots: {
      customRender: 'action',
    },
  },
  {
    title: '明细磅单号',
    dataIndex: 'zmxdocNo',
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
  },
  {
    title: '车次',
    width: 100,
    dataIndex: 'zccheci',
    align: 'center'
  },
  {
    title: '车型',
    width: 100,
    dataIndex: 'chexing',
    align: 'center'
  },
  {
    title: '煤源矿点名称',
    width: 100,
    dataIndex: 'mykuangdianmc',
    align: 'center'
  },
  {
    title: '煤源矿点编码',
    width: 100,
    dataIndex: 'mykuangdianbm',
    align: 'center'
  },
  {
    title: '首车号',
    width: 100,
    dataIndex: 'shouchehao',
    align: 'center'
  },
  {
    title: '尾车号',
    width: 100,
    dataIndex: 'weichehao',
    align: 'center'
  },
  {
    title: '车数',
    width: 100,
    dataIndex: 'cheshu',
    align: 'center'
  },
  {
    title: '计量单位',
    width: 100,
    dataIndex: 'jiliangdanwei',
    align: 'center'
  },
  {
    title: '总票重',
    width: 100,
    dataIndex: 'zongpiaozhong',
    align: 'center'
  },
  {
    title: '总毛重',
    width: 100,
    dataIndex: 'zongmaozhong',
    align: 'center'
  },
  {
    title: '总皮重',
    width: 100,
    dataIndex: 'zongpizhong',
    align: 'center'
  },
  {
    title: '总净重',
    width: 100,
    dataIndex: 'zongjingzhong',
    align: 'center'
  },
  {
    title: '总扣吨量',
    width: 100,
    dataIndex: 'koudunzongliang',
    align: 'center'
  },
  {
    title: '结算煤量',
    width: 100,
    dataIndex: 'jiesuanmeiliang',
    align: 'center'
  },
  {
    title: '总盈亏',
    width: 100,
    dataIndex: 'zongyingkui',
    align: 'center'
  },
  {
    title: '总盈吨',
    width: 100,
    dataIndex: 'zongyingdun',
    align: 'center'
  },
  {
    title: '总运损',
    width: 100,
    dataIndex: 'zongyunsun',
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

function upload(param) {
    alert(param);
}
</script>