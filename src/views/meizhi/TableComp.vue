<template>
  <a-table :row-selection="rowSelection" rowKey="id" :columns="columns" :scroll="{ x: 1500, y: 800 }" :data-source="tableData.records" :pagination="pagination" :loading="loading" @change="handleTableChange" size="small" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'mybs'">
          <a @click.prevent="viewDetail(record)">{{ record.mybs }}</a>
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
defineExpose({search, upload});
const emit = defineEmits(['viewDetail'])

const ajaxParam = reactive({
    method: 'post',
    url: cicsUrl + '/meizhi/search',
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
    dataIndex: 'mybs',
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
      title: '二级公司',
      width: 120,
      dataIndex: 'ssejdw',
      align: 'center'
  },
  {
      title: '二级公司代码',
      width: 130,
      dataIndex: 'ssejdwid',
      align: 'center'
  },
  {
      title: '三级公司',
      width: 120,
      dataIndex: 'sssjdw',
      align: 'center'
  },
  {
      title: '三级公司代码',
      width: 130,
      dataIndex: 'sssjdwid',
      align: 'center'
  },
  {
      title: '化验总批煤量',
      width: 120,
      dataIndex: 'hypml',
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
      title: '化验室名称',
      width: 200,
      dataIndex: 'hyorgname',
      align: 'center'
  },
  {
      title: '检测方式',
      width: 100,
      dataIndex: 'jiancefangshi',
      align: 'center'
  },
  {
      title: '检测设备名称',
      width: 120,
      dataIndex: 'jiancesbmc',
      align: 'center'
  },
  {
      title: '检测设备ID',
      width: 110,
      dataIndex: 'jiancesbid',
      align: 'center'
  },
  {
      title: '化验日期',
      width: 200,
      dataIndex: 'assayI',
      align: 'center'
  },
  {
      title: '化验时间',
      width: 100,
      dataIndex: 'assayT',
      align: 'center'
  },
  {
      title: '全水分（%）',
      width: 150,
      dataIndex: 'ngymt',
      align: 'center'
  },
  {
      title: '分析水（%）',
      width: 150,
      dataIndex: 'ngymad',
      align: 'center'
  },
  {
      title: '灰分（收到基）（%）',
      width: 170,
      dataIndex: 'nlcfaar',
      align: 'center'
  },
  {
      title: '灰分（空干基）（%）',
      width: 170,
      dataIndex: 'ngyaad',
      align: 'center'
  },
  {
      title: '灰分（干基）（%）',
      width: 170,
      dataIndex: 'nlcfad',
      align: 'center'
  },
  {
      title: '挥发分（收到基）（%）',
      width: 180,
      dataIndex: 'nlcfvar',
      align: 'center'
  },
  {
      title: '挥发分（空干基）（%）',
      width: 180,
      dataIndex: 'ngyvad',
      align: 'center'
  },
  {
      title: '挥发分（干基）（%）',
      width: 180,
      dataIndex: 'nlcfvd',
      align: 'center'
  },
  {
      title: '挥发分（干燥无灰基）（%）',
      width: 200,
      dataIndex: 'ngyvdaf',
      align: 'center'
  },
  {
      title: '硫分（收到基）（%）',
      width: 190,
      dataIndex: 'nlcfstar',
      align: 'center'
  },
  {
      title: '硫分（空干基）（%）',
      width: 200,
      dataIndex: 'nlcfstad',
      align: 'center'
  },
  {
      title: '硫分（干基）（%）',
      width: 150,
      dataIndex: 'nlcfstd',
      align: 'center'
  },
  {
      title: '高位发热量（干基）（MJ/kg）',
      width: 300,
      dataIndex: 'nqgrdmj',
      align: 'center'
  },
  {
      title: '低位发热量（收到基）（MJ/kg）',
      width: 300,
      dataIndex: 'nqnetarmj',
      align: 'center'
  },
  {
      title: '低位发热量（收到基）（kcal/kg）',
      width: 300,
      dataIndex: 'nqnetmarkc',
      align: 'center'
  },
  {
      title: '弹筒发热量（MJ/kg）',
      width: 200,
      dataIndex: 'nqbadmj',
      align: 'center'
  },
  {
      title: '高位发热量（空气干燥基）（MJ/kg）',
      width: 300,
      dataIndex: 'nqgradmj',
      align: 'center'
  },
  {
      title: '高位发热量（空气干燥基）（kcal/kg）',
      width: 300,
      dataIndex: 'nqgradkc',
      align: 'center'
  },
  {
      title: '高位发热量（干燥基）（kcal/kg））',
      width: 300,
      dataIndex: 'nqgrdkc',
      align: 'center'
  },
  {
      title: '高位发热量（收到基）',
      width: 180,
      dataIndex: 'nqgrarmj',
      align: 'center'
  },
  {
      title: '粘结指数',
      width: 100,
      dataIndex: 'bondindex',
      align: 'center'
  },
  {
      title: '灰熔融性-变形温度',
      width: 150,
      dataIndex: 'nhrDt',
      align: 'center'
  },
  {
      title: '灰熔融性-软化温度',
      width: 150,
      dataIndex: 'nhrSt',
      align: 'center'
  },
  {
      title: '灰熔融性-半球温度',
      width: 150,
      dataIndex: 'nhrHt',
      align: 'center'
  },
  {
      title: '灰熔融性-流动温度',
      width: 150,
      dataIndex: 'nhr_ft',
      align: 'center'
  },
  {
      title: '焦渣特性',
      width: 100,
      dataIndex: 'nymqcrc',
      align: 'center'
  },
  {
      title: '氢（收到基）',
      width: 130,
      dataIndex: 'nyshar',
      align: 'center'
  },
  {
      title: '氢（空干基）',
      width: 130,
      dataIndex: 'nyshad',
      align: 'center'
  },
  {
      title: '氢（干基）',
      width: 100,
      dataIndex: 'nyshd',
      align: 'center'
  },
  {
      title: '氢（干燥无灰基）',
      width: 150,
      dataIndex: 'nyhdaf',
      align: 'center'
  },
  {
      title: '碳（空干基）',
      width: 150,
      dataIndex: 'nyscad',
      align: 'center'
  },
  {
      title: '碳（干基）',
      width: 100,
      dataIndex: 'nyscd',
      align: 'center'
  },
  {
      title: '碳（干燥无灰基）',
      width: 150,
      dataIndex: 'nycdaf',
      align: 'center'
  },
  {
      title: '哈式可磨指数',
      width: 150,
      dataIndex: 'hgi',
      align: 'center'
  },
  {
      title: '固定碳（空干基）（%）',
      width: 190,
      dataIndex: 'nysfcad',
      align: 'center'
  },
  {
      title: '固定碳（干基）（%）',
      width: 190,
      dataIndex: 'nyshfcd',
      align: 'center'
  },
  {
      title: '煤灰成分Al2O3',
      width: 150,
      dataIndex: 'mhcfAlo',
      align: 'center'
  },
  {
      title: '煤灰成分CaO',
      width: 150,
      dataIndex: 'mhcfCao',
      align: 'center'
  },
  {
      title: '煤灰成分MgO',
      width: 150,
      dataIndex: 'mhcfMgo',
      align: 'center'
  },
  {
      title: '煤灰成分SO3',
      width: 150,
      dataIndex: 'mhcfSo',
      align: 'center'
  },
  {
      title: '煤灰成分TiO2',
      width: 150,
      dataIndex: 'mhcfTio',
      align: 'center'
  },
  {
      title: '煤灰成分P2O5',
      width: 160,
      dataIndex: 'mhcfPo',
      align: 'center'
  },
  {
      title: '煤灰成分K2O',
      width: 150,
      dataIndex: 'mhcfKo',
      align: 'center'
  },
  {
      title: '煤灰成分NaO2',
      width: 150,
      dataIndex: 'mhcfNao',
      align: 'center'
  },
  {
      title: '煤灰成分SiO2',
      width: 150,
      dataIndex: 'mhcfSio',
      align: 'center'
  },
  {
      title: '煤灰成分Fe2O3',
      width: 150,
      dataIndex: 'mhcfFeo',
      align: 'center'
  },
  {
      title: '装车单号',
      width: 100,
      dataIndex: 'zcdanhao',
      align: 'center'
  },
  {
      title: '卸车单号',
      width: 100,
      dataIndex: 'xiecheid',
      align: 'center'
  },
  {
      title: '装车首车号',
      width: 100,
      dataIndex: 'loadStartNo',
      align: 'center'
  },
  {
      title: '装车尾车号',
      width: 100,
      dataIndex: 'loadEndNo',
      align: 'center'
  },
  {
      title: '编组编号',
      width: 100,
      dataIndex: 'bzId',
      align: 'center'
  },
  {
      title: '煤质信息状态',
      width: 120,
      dataIndex: 'status',
      align: 'center'
  },
  {
      title: '快/慢灰',
      width: 100,
      dataIndex: 'kuaimanhui',
      align: 'center'
  },
  {
      title: '委托单号',
      width: 100,
      dataIndex: 'wtdh',
      align: 'center'
  },
  {
      title: '出证日期',
      width: 100,
      dataIndex: 'czrq',
      align: 'center'
  },
  {
      title: '证书编号',
      width: 100,
      dataIndex: 'zsbh',
      align: 'center'
  },
  {
      title: '备注',
      width: 100,
      dataIndex: 'beizhu',
      align: 'center'
  },
  {
      title: '数据推送单位',
      width: 120,
      dataIndex: 'sjtsdanwei',
      align: 'center'
  }
//   {
//       title: '数据推送日期',
//       width: 120,
//       dataIndex: 'xtscjlI',
//       align: 'center'
//   },
//   {
//       title: '数据推送时间',
//       width: 120,
//       dataIndex: 'xtscjlT',
//       align: 'center'
//   }
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
        url: cicsUrl + '/meizhi/upload',
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
        props.searchParam.loading = false;
        console.log(error);
    });
};

</script>