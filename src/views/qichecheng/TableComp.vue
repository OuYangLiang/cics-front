<template>
  <a-popconfirm title="确认上报吗?" @confirm="upload()" >
      <a-button type="primary" :disabled="!hasSelected" :loading="uploadState.loading" >
        上传
      </a-button>
  </a-popconfirm>
  <a-divider />
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
import axios from 'axios'
import { reactive, defineExpose, computed, inject} from 'vue';
import { useRequest } from 'vue-request';
import { useRouter } from 'vue-router'
import moment from 'moment';
const cicsUrl = inject('cicsUrl')

const router = useRouter()
const props = defineProps({searchParam: Object})
defineExpose({search});
const emit = defineEmits(['viewDetail'])

const ajaxParam = reactive({
    method: 'post',
    url: cicsUrl + '/qichecheng/search',
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
    title: '发运站名称',
    width: 100,
    dataIndex: 'zsitename',
    align: 'center'
  },
  {
    title: '发运站编码',
    width: 120,
    dataIndex: 'zsitebm',
    align: 'center'
  },
  {
    title: '收货单位名称',
    width: 120,
    dataIndex: 'zname1',
    align: 'center'
  },
  {
    title: '收货单位编码',
    width: 120,
    dataIndex: 'zkunnr',
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
    width: 120,
    dataIndex: 'mykuangdianbm',
    align: 'center'
  },
  {
    title: '煤炭来源',
    width: 100,
    dataIndex: 'meitanlaiyuan',
    align: 'center'
  },
  {
    title: '煤炭来源编码',
    width: 120,
    dataIndex: 'meitanlaiyuanbm',
    align: 'center'
  },
  {
    title: '煤种',
    width: 100,
    dataIndex: 'meizhong',
    align: 'center'
  },
  {
    title: '煤种编码',
    width: 100,
    dataIndex: 'meizhongbm',
    align: 'center'
  },
  {
    title: '批煤过磅开始日期',
    width: 200,
    dataIndex: 'zbeginI',
    align: 'center'
  },
  {
    title: '批煤过磅开始时间',
    width: 200,
    dataIndex: 'zbeginT',
    align: 'center'
  },
  {
    title: '批煤过磅结束日期',
    width: 200,
    dataIndex: 'zendI',
    align: 'center'
  },
  {
    title: '批煤过磅结束时间',
    width: 200,
    dataIndex: 'zendT',
    align: 'center'
  },
  {
    title: '车队名称',
    width: 100,
    dataIndex: 'zname1Car',
    align: 'center'
  },
  {
    title: '发运量',
    width: 100,
    dataIndex: 'zmeng',
    align: 'center'
  },
  {
    title: '验收量',
    width: 100,
    dataIndex: 'zmengpod',
    align: 'center'
  },
  {
    title: '计量单位',
    width: 100,
    dataIndex: 'jiliangdanwei',
    align: 'center'
  },
  {
    title: '主磅单号',
    width: 100,
    dataIndex: 'zmasterNo',
    align: 'center'
  },
  {
    title: '车数',
    width: 100,
    dataIndex: 'cheshu',
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
        url: cicsUrl + '/qichecheng/upload',
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
        uploadState.loading = false;
    }).catch(function (error) {
        uploadState.loading = false;
        console.log(error);
    });
};

</script>