<template>
  <a-table :row-selection="rowSelection" rowKey="id" :columns="columns" :scroll="{ x: 1500, y: 800 }" :data-source="tableData.records" :pagination="pagination" :loading="loading" @change="handleTableChange" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'zmxdocNo'">
          <a @click.prevent="viewDetail(record)">{{ record.zmxdocNo }}</a>
        </template>
        <template v-if="column.dataIndex === 'uploadTime'">
          {{ format(record.uploadTime) }}
        </template>
        <template v-if="column.dataIndex === 'ywrq'">
          {{ formatywrq(record.ywrq) }}
        </template>
      </template>
  </a-table>
</template>

<script setup>
// import { UploadOutlined} from '@ant-design/icons-vue';
import axios from 'axios'
import { reactive, defineExpose, computed, inject} from 'vue';
import { useRequest } from 'vue-request';
import { useRouter } from 'vue-router'
import moment from 'moment';
const cicsUrl = inject('cicsUrl')

const router = useRouter()
const props = defineProps({searchParam: Object})
defineExpose({search, upload});
const emit = defineEmits(['viewDetail'])

const ajaxParam = reactive({
    method: 'post',
    url: cicsUrl + "/guidaoheng/search",
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
    align: 'center',
    fixed: 'left'
  },
  {
    title: '批次编号',
    dataIndex: 'zmxdocNo',
    width: 200,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '业务日期',
    width: 100,
    dataIndex: 'ywrq',
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
    width: 200,
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
    title: '二级公司',
    dataIndex: 'ssejdw',
    width: 150,
    align: 'center'
  },
  {
    title: '三级公司',
    width: 150,
    dataIndex: 'sssjdw',
    align: 'center'
  },
  {
    title: '业务日期',
    width: 100,
    dataIndex: 'yewurq',
    align: 'center'
  },
  {
    title: '车次',
    width: 200,
    dataIndex: 'zccheci',
    align: 'center'
  },
  {
    title: '车型',
    width: 200,
    dataIndex: 'chexing',
    align: 'center'
  },
  {
    title: '煤源矿点名称',
    width: 200,
    dataIndex: 'mykuangdianmc',
    align: 'center'
  },
  {
    title: '煤源矿点编码',
    width: 200,
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

function viewDetail(param) {
    try {
        emit("viewDetail", param);
    } catch (e) {
        console.log(e);
    }
}

function format(param) {
    return null == param ? '' : moment(param).format('YYYY-MM-DD HH:mm:ss');
}

function formatywrq(param) {
    return null == param ? '' : moment(param).format('YYYY-MM-DD');
}

const uploadState = reactive({
  selectedRowKeys: []
});

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    uploadState.selectedRowKeys = selectedRowKeys;
  }
};

import { notification } from 'ant-design-vue';
function upload() {
    props.searchParam.loading = true;
    axios({
        method: 'post',
        url: cicsUrl + '/guidaoheng/upload',
        headers: {
            "Authorization":localStorage.getItem('token')
        },
        data: {
            ids: uploadState.selectedRowKeys,
            operator: localStorage.getItem('currentLogin')
        }
    }).then(function (response) {
        const resp = response.data;
        if (resp.success) {
            if (resp.data) {
                  notification.success({
                      message: '上报成功',
                      description: '上报成功',
                      duration: 2,
                  });
              } else {
                  notification.error({
                      message: '上报失败',
                      description: '失败原因请从日志查询',
                      duration: 20,
                  });
              }
        } else {
            notification.error({
                message: '错误',
                description: resp.errorMsg,
                duration: 2,
            });
        }
        search();
        props.searchParam.loading = false;
    }).catch(function (error) {
        console.log(error);
        props.searchParam.loading = false;
    });
};

</script>