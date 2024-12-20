<template>
  <a-table :row-selection="rowSelection" rowKey="id" :columns="columns" :scroll="{ x: 1500, y: 800 }" :data-source="tableData.records" :pagination="pagination" :loading="loading" @change="handleTableChange" size="small" bordered>
      <template #bodyCell="{ column, record }">
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
    url: cicsUrl + '/huayandan/search',
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
    title: '上报人',
    width: 100,
    dataIndex: 'operator',
    align: 'center'
  },
{
    title: '化验单ID',
    width: 120,
    dataIndex: 'dtHydid',
    align: 'center'
},
{
    title: '化验单序号',
    width: 100,
    dataIndex: 'dtHydxh',
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
    width: 140,
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
    width: 140,
    dataIndex: 'sssjdwid',
    align: 'center'
},
{
    title: '化验室名称',
    width: 200,
    dataIndex: 'hyorgname',
    align: 'center'
},
{
    title: '采样日期',
    width: 200,
    dataIndex: 'sampeldate',
    align: 'center'
},
{
    title: '采样编号',
    width: 120,
    dataIndex: 'sampleid',
    align: 'center'
},
{
    title: '化验编号',
    width: 120,
    dataIndex: 'assayid',
    align: 'center'
},
{
    title: '检测结果用途',
    width: 120,
    dataIndex: 'jiancejieguoyt',
    align: 'center'
},
{
    title: '数据上传方式',
    width: 120,
    dataIndex: 'sjscfs',
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
    width: 120,
    dataIndex: 'jiancesbid',
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
    title: '化验日期',
    width: 200,
    dataIndex: 'dtAssayI',
    align: 'center'
},
{
    title: '化验时间',
    width: 100,
    dataIndex: 'dtAssayT',
    align: 'center'
},
{
    title: '对应煤量',
    width: 100,
    dataIndex: 'dtDuiyingml',
    align: 'center'
},
{
    title: '全水分（%）',
    width: 150,
    dataIndex: 'dtNgymt',
    align: 'center'
},
{
    title: '分析水（%）',
    width: 150,
    dataIndex: 'dtNgymad',
    align: 'center'
},
{
    title: '灰分（收到基）（%）',
    width: 180,
    dataIndex: 'dtNlcfaar',
    align: 'center'
},
{
    title: '灰分（空干基）（%）',
    width: 180,
    dataIndex: 'dtNgyaad',
    align: 'center'
},
{
    title: '灰分（干基）（%）',
    width: 180,
    dataIndex: 'dtNlcfad',
    align: 'center'
},
{
    title: '挥发分（收到基）（%）',
    width: 250,
    dataIndex: 'dtNlcfvar',
    align: 'center'
},
{
    title: '挥发分（空干基）（%）',
    width: 200,
    dataIndex: 'dtNgyvad',
    align: 'center'
},
{
    title: '挥发分（干基）（%）',
    width: 200,
    dataIndex: 'dtNlcfvd',
    align: 'center'
},
{
    title: '挥发分（干燥无灰基）（%）',
    width: 200,
    dataIndex: 'dtNgyvdaf',
    align: 'center'
},
{
    title: '硫分（收到基）（%）',
    width: 200,
    dataIndex: 'dtNlcfstar',
    align: 'center'
},
{
    title: '硫分（空干基）（%）',
    width: 200,
    dataIndex: 'dtNlcfstad',
    align: 'center'
},
{
    title: '硫分（干基）（%）',
    width: 200,
    dataIndex: 'dtNlcfstd',
    align: 'center'
},
{
    title: '高位发热量（干基）（MJ/kg）',
    width: 300,
    dataIndex: 'dtNqgrdmj',
    align: 'center'
},
{
    title: '低位发热量（收到基）（MJ/kg）',
    width: 300,
    dataIndex: 'dtNqnetarmj',
    align: 'center'
},
{
    title: '低位发热量（收到基）（kcal/kg）',
    width: 350,
    dataIndex: 'dtNqnetmarkc',
    align: 'center'
},
{
    title: '弹筒发热量（MJ/kg）',
    width: 200,
    dataIndex: 'dtNqbadmj',
    align: 'center'
},
{
    title: '高位发热量（空气干燥基）（MJ/kg）',
    width: 350,
    dataIndex: 'dtNqgradmj',
    align: 'center'
},
{
    title: '高位发热量（空气干燥基）（kcal/kg）',
    width: 350,
    dataIndex: 'dtNqgradkc',
    align: 'center'
},
{
    title: '高位发热量（干燥基）（kcal/kg））',
    width: 350,
    dataIndex: 'dtNqgrdkc',
    align: 'center'
},
{
    title: '高位发热量（收到基）',
    width: 190,
    dataIndex: 'dtNqgrarmj',
    align: 'center'
},
{
    title: '粘结指数',
    width: 100,
    dataIndex: 'dtBondindex',
    align: 'center'
},
{
    title: '灰熔融性-变形温度',
    width: 190,
    dataIndex: 'dtNhrdt',
    align: 'center'
},
{
    title: '灰熔融性-软化温度',
    width: 190,
    dataIndex: 'dtNhrst',
    align: 'center'
},
{
    title: '灰熔融性-半球温度',
    width: 190,
    dataIndex: 'dtNhrht',
    align: 'center'
},
{
    title: '灰熔融性-流动温度',
    width: 190,
    dataIndex: 'dtNhrft',
    align: 'center'
},
{
    title: '焦渣特性',
    width: 100,
    dataIndex: 'dtNymqcrc',
    align: 'center'
},
{
    title: '氢（收到基）',
    width: 130,
    dataIndex: 'dtNyshar',
    align: 'center'
},
{
    title: '氢（空干基）',
    width: 130,
    dataIndex: 'dtNyshad',
    align: 'center'
},
{
    title: '氢（干基）',
    width: 130,
    dataIndex: 'dtNyshd',
    align: 'center'
},
{
    title: '氢（干燥无灰基）',
    width: 150,
    dataIndex: 'dtNyhdaf',
    align: 'center'
},
{
    title: '碳（空干基）',
    width: 130,
    dataIndex: 'dtNyscad',
    align: 'center'
},
{
    title: '碳（干基）',
    width: 130,
    dataIndex: 'dtNyscd',
    align: 'center'
},
{
    title: '碳（干燥无灰基）',
    width: 150,
    dataIndex: 'dtNycdaf',
    align: 'center'
},
{
    title: '哈式可磨指数',
    width: 120,
    dataIndex: 'dtHgi',
    align: 'center'
},
{
    title: '固定碳（空干基）（%）',
    width: 190,
    dataIndex: 'dtNysfcad',
    align: 'center'
},
{
    title: '固定碳（干基）（%）',
    width: 190,
    dataIndex: 'dtNyshfcd',
    align: 'center'
},
{
    title: '快/慢灰',
    width: 150,
    dataIndex: 'dtKuaimanhui',
    align: 'center'
},
{
    title: '数据推送单位',
    width: 120,
    dataIndex: 'sjtsdanwei',
    align: 'center'
}
// {
//     title: '数据推送日期',
//     width: 120,
//     dataIndex: 'xtscjlI',
//     align: 'center'
// },
// {
//     title: '数据推送时间',
//     width: 120,
//     dataIndex: 'xtscjlT',
//     align: 'center'
// }
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
        url: cicsUrl + '/huayandan/upload',
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