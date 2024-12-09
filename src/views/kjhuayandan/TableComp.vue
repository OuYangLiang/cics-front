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
    url: cicsUrl + '/kjhuayandan/search',
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
  width: 100,
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
    width: 200,
    dataIndex: 'dtHydid',
    align: 'center'
},
{
    title: '化验单序号',
    width: 200,
    dataIndex: 'dtHydxh',
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
    width: 200,
    dataIndex: 'sampleid',
    align: 'center'
},
{
    title: '化验编号',
    width: 200,
    dataIndex: 'assayid',
    align: 'center'
},
{
    title: '检测结果用途',
    width: 200,
    dataIndex: 'jiancejieguoyt',
    align: 'center'
},
{
    title: '检测方式',
    width: 200,
    dataIndex: 'jiancefangshi',
    align: 'center'
},
{
    title: '数据上传方式',
    width: 200,
    dataIndex: 'sjscfs',
    align: 'center'
},
{
    title: '检测设备名称',
    width: 200,
    dataIndex: 'jiancesbmc',
    align: 'center'
},
{
    title: '检测设备ID',
    width: 200,
    dataIndex: 'jiancesbid',
    align: 'center'
},
{
    title: '煤种',
    width: 200,
    dataIndex: 'meizhong',
    align: 'center'
},
{
    title: '煤种编码',
    width: 200,
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
    width: 200,
    dataIndex: 'dtAssayT',
    align: 'center'
},
{
    title: '对应煤量',
    width: 200,
    dataIndex: 'dtDuiyingml',
    align: 'center'
},
{
    title: '协议版本号',
    width: 200,
    dataIndex: 'version',
    align: 'center'
},
{
    title: '快检装置铭牌id',
    width: 200,
    dataIndex: 'equipmentId',
    align: 'center'
},
{
    title: '信息数量',
    width: 200,
    dataIndex: 'infoCount',
    align: 'center'
},
{
    title: '离线批次的批次编号（采样编号）',
    width: 300,
    dataIndex: 'scanNumber',
    align: 'center'
},
{
    title: '在线/离线标志位',
    width: 200,
    dataIndex: 'onLineStatus',
    align: 'center'
},
{
    title: '信息唯一性标识',
    width: 200,
    dataIndex: 'indexUuid',
    align: 'center'
},
{
    title: '装车煤种',
    width: 200,
    dataIndex: 'coalName',
    align: 'center'
},
{
    title: '装车车次/装船船次',
    width: 200,
    dataIndex: 'trainNumber',
    align: 'center'
},
{
    title: '装车/卸车/装船/卸船单号',
    width: 200,
    dataIndex: 'loadNumber',
    align: 'center'
},
{
    title: '装车站点/装船码头',
    width: 200,
    dataIndex: 'loadSite',
    align: 'center'
},
{
    title: '首车号',
    width: 200,
    dataIndex: 'firstNumber',
    align: 'center'
},
{
    title: '尾车号',
    width: 200,
    dataIndex: 'tailNumber',
    align: 'center'
},
{
    title: '装车时间',
    width: 200,
    dataIndex: 'loadTime',
    align: 'center'
},
{
    title: '平均收到基低位（单位MJ/kg）',
    width: 300,
    dataIndex: 'avglowHeatValueMj',
    align: 'center'
},
{
    title: '平均干基高位发热量（单位MJ/kg）',
    width: 300,
    dataIndex: 'avghighHeatValueMj',
    align: 'center'
},
{
    title: '平均收到基低位（单位kcal/kg）',
    width: 300,
    dataIndex: 'avglowHeatValueKcal',
    align: 'center'
},
{
    title: '平均干基高位发热量（单位kcal/kg）',
    width: 300,
    dataIndex: 'avghighHeatValueKcal',
    align: 'center'
},
{
    title: '平均干基灰分',
    width: 200,
    dataIndex: 'avgashContent',
    align: 'center'
},
{
    title: '平均干基硫分',
    width: 200,
    dataIndex: 'avgsulfurContent',
    align: 'center'
},
{
    title: '平均全水',
    width: 200,
    dataIndex: 'avgfullyWash',
    align: 'center'
},
{
    title: '平均灰熔点',
    width: 200,
    dataIndex: 'avgashMeltingPoint',
    align: 'center'
},
{
    title: '平均碳含量',
    width: 200,
    dataIndex: 'avgcarbonContent',
    align: 'center'
},
{
    title: '平均氢含量',
    width: 200,
    dataIndex: 'avghydrogenContent',
    align: 'center'
},
{
    title: '平均挥发分',
    width: 200,
    dataIndex: 'avgvolatileMatter',
    align: 'center'
},
{
    title: '平均固定碳',
    width: 200,
    dataIndex: 'avgfixedCarbon',
    align: 'center'
},
{
    title: '平均有害元素CL',
    width: 200,
    dataIndex: 'avgharmfulElementCI',
    align: 'center'
},
{
    title: '平均有害元素P',
    width: 200,
    dataIndex: 'avgharmfulElementP',
    align: 'center'
},
{
    title: '平均干基挥发分',
    width: 200,
    dataIndex: 'avgDryVolatileMatter',
    align: 'center'
},
{
    title: '平均变形温度',
    width: 200,
    dataIndex: 'avgDeformationTemp',
    align: 'center'
},
{
    title: '平均软化温度',
    width: 200,
    dataIndex: 'avgSofteningTemp',
    align: 'center'
},
{
    title: '平均半球温度',
    width: 200,
    dataIndex: 'avgHemisphereTemp',
    align: 'center'
},
{
    title: '平均流动温度',
    width: 200,
    dataIndex: 'avgFlowTemp',
    align: 'center'
},
{
    title: '单勺序列号',
    width: 200,
    dataIndex: 'singleIndex',
    align: 'center'
},
{
    title: '单勺干基低位（单位MJ/kg）',
    width: 200,
    dataIndex: 'singlelowHeatValueMj',
    align: 'center'
},
{
    title: '单勺干基高位（单位MJ/kg）',
    width: 200,
    dataIndex: 'singlehighHeatValueMj',
    align: 'center'
},
{
    title: '单勺干基低位（单位kcal/kg）',
    width: 300,
    dataIndex: 'singlelowHeatValueKcal',
    align: 'center'
},
{
    title: '单勺干基高位（单位kcal/kg）',
    width: 300,
    dataIndex: 'singlehighHeatValueKcal',
    align: 'center'
},
{
    title: '单勺干基灰分',
    width: 200,
    dataIndex: 'singleashContent',
    align: 'center'
},
{
    title: '单勺干基硫分',
    width: 200,
    dataIndex: 'singlesulfurContent',
    align: 'center'
},
{
    title: '单勺全水',
    width: 200,
    dataIndex: 'singlefullyWash',
    align: 'center'
},
{
    title: '单勺灰熔点',
    width: 200,
    dataIndex: 'singleashMeltingPoint',
    align: 'center'
},
{
    title: '单勺碳含量',
    width: 200,
    dataIndex: 'singlecarbonContent',
    align: 'center'
},
{
    title: '单勺氢含量',
    width: 200,
    dataIndex: 'singlehydrogenContent',
    align: 'center'
},
{
    title: '单勺挥发分',
    width: 200,
    dataIndex: 'singlevolatileMatter',
    align: 'center'
},
{
    title: '单勺固定碳',
    width: 200,
    dataIndex: 'singllefixedCarbon',
    align: 'center'
},
{
    title: '单勺有害元素CL',
    width: 200,
    dataIndex: 'singleharmfulElementCI',
    align: 'center'
},
{
    title: '单勺有害元素P',
    width: 200,
    dataIndex: 'singleharmfulElementP',
    align: 'center'
},
{
    title: '单勺干基挥发分',
    width: 200,
    dataIndex: 'singleDryVolatileMatter',
    align: 'center'
},
{
    title: '单勺变形温度',
    width: 200,
    dataIndex: 'singleDeformationTemp',
    align: 'center'
},
{
    title: '单勺软化温度',
    width: 200,
    dataIndex: 'singleSofteningTemp',
    align: 'center'
},
{
    title: '单勺半球温度',
    width: 200,
    dataIndex: 'singleHemisphereTemp',
    align: 'center'
},
{
    title: '单勺流动温度',
    width: 200,
    dataIndex: 'singleFlowTemp',
    align: 'center'
},
{
    title: '开始时间',
    width: 200,
    dataIndex: 'startTime',
    align: 'center'
},
{
    title: '结束时间',
    width: 200,
    dataIndex: 'finishTime',
    align: 'center'
},
{
    title: '体积',
    width: 200,
    dataIndex: 'volume',
    align: 'center'
},
{
    title: '模型版本',
    width: 200,
    dataIndex: 'algoModel',
    align: 'center'
},
{
    title: '模型更新时间',
    width: 200,
    dataIndex: 'algoModelUpdateTime',
    align: 'center'
},
{
    title: '煤流参数1',
    width: 200,
    dataIndex: 'sampleParameter1',
    align: 'center'
},
{
    title: '煤流参数2',
    width: 200,
    dataIndex: 'sampleParameter2',
    align: 'center'
},
{
    title: '车次结束标识',
    width: 200,
    dataIndex: 'trainNumberStop',
    align: 'center'
},
{
    title: '检测子样个数',
    width: 200,
    dataIndex: 'testSampleCount',
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
        url: cicsUrl + '/kjhuayandan/upload',
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