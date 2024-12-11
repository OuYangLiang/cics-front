<template>
    <a-drawer width="1240" placement="right" :closable=" false " :visible=" props.detailControl.visible " @close=" onClose ">
        <a-descriptions :title="props.detailControl.record.employeeName">
            <a-descriptions-item label="明细磅单号">{{ props.detailControl.record.zmxdocNo }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司">{{ props.detailControl.record.ssejdw }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司代码">{{ props.detailControl.record.ssejdwid }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司">{{ props.detailControl.record.sssjdw }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司代码">{{ props.detailControl.record.sssjdwid }}</a-descriptions-item>
        </a-descriptions>

        <a-table :columns="columns" :data-source="props.detailControl.record.dtData" :scroll="{ x: 1000, y: true }" :pagination="pagination" size="small" bordered />
    </a-drawer>
</template>
<script setup>
const pagination = false;
const props = defineProps({detailControl: Object})

const onClose = () => {
    props.detailControl.visible = false;
};

const columns = [
{
    title: '每车详情-序号',
    width: 100,
    dataIndex: 'dtSortno',
    align: 'center'
},
{
    title: '每车详情-车牌号',
    width: 100,
    dataIndex: 'dtChepaihao',
    align: 'center'
},
{
    title: '每车详情-票重',
    width: 100,
    dataIndex: 'dtPiaozhong',
    align: 'center'
},
{
    title: '每车详情-毛重',
    width: 100,
    dataIndex: 'dtMaozhong',
    align: 'center'
},
{
    title: '每车详情-皮重',
    width: 100,
    dataIndex: 'dtPizhong',
    align: 'center'
},
{
    title: '每车详情-净重',
    width: 100,
    dataIndex: 'dtJingzhong',
    align: 'center'
},
{
    title: '每车详情-盈吨',
    width: 100,
    dataIndex: 'dtYingdun',
    align: 'center'
},
{
    title: '每车详情-亏吨',
    width: 100,
    dataIndex: 'dtKuidun',
    align: 'center'
},
{
    title: '每车详情-运损',
    width: 100,
    dataIndex: 'dtYunsun',
    align: 'center'
},
{
    title: '每车详情-扣吨量',
    width: 100,
    dataIndex: 'dtKoudunl',
    align: 'center'
},
{
    title: '每车详情-检重日期',
    width: 100,
    dataIndex: 'dtJzdate',
    align: 'center'
},
{
    title: '车详情-检重时间',
    width: 100,
    dataIndex: 'dtJztime',
    align: 'center'
},
{
    title: '每车详情-检轻日期',
    width: 100,
    dataIndex: 'dtJqdate',
    align: 'center'
},
{
    title: '每车详情-检轻时间',
    width: 100,
    dataIndex: 'dtJqtime',
    align: 'center'
},
{
    title: '每车详情-检重衡名称',
    width: 100,
    dataIndex: 'dtJzhmc',
    align: 'center'
},
{
    title: '每车详情-检重衡ID',
    width: 100,
    dataIndex: 'dtJzhid',
    align: 'center'
},
{
    title: '每车详情-检轻衡名称',
    width: 100,
    dataIndex: 'dtJqhmc',
    align: 'center'
},
{
    title: '每车详情-检轻衡ID',
    width: 100,
    dataIndex: 'dtJqhid',
    align: 'center'
}
];
</script>