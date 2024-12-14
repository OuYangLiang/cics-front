<template>
    <a-drawer width="1240" placement="right" :closable=" false " :visible=" props.detailControl.visible " @close=" onClose ">
        <a-descriptions :title="props.detailControl.record.employeeName">
            <a-descriptions-item label="批次煤样标识">{{ props.detailControl.record.mybs }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司">{{ props.detailControl.record.ssejdw }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司代码">{{ props.detailControl.record.ssejdwid }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司">{{ props.detailControl.record.sssjdw }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司代码">{{ props.detailControl.record.sssjdwid }}</a-descriptions-item>
        </a-descriptions>

        <a-table :pagination="pagination" :columns="columns" :data-source="props.detailControl.record.dtCydy" :scroll="{ x: 1000, y: 400 }" size="small" bordered />
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
    title: '采样单元详情-采样单元序号',
    width: 100,
    dataIndex: 'dtCydyxh',
    align: 'center'
},
{
    title: '采样单元详情-采样设备名称',
    width: 100,
    dataIndex: 'dtCysbmc',
    align: 'center'
},
{
    title: '采样单元详情-采样设备编号',
    width: 100,
    dataIndex: 'dtCysbbm',
    align: 'center'
},
{
    title: '采样单元详情-采样方式',
    width: 100,
    dataIndex: 'dtCyfs',
    align: 'center'
},
{
    title: '采样单元详情-采样单元编码',
    width: 100,
    dataIndex: 'dtCydybm',
    align: 'center'
},
{
    title: '采样单元详情-采样开始日期',
    width: 100,
    dataIndex: 'dtCysdate',
    align: 'center'
},
{
    title: '采样单元详情-采样开始时间',
    width: 100,
    dataIndex: 'dtCystime',
    align: 'center'
},
{
    title: '采样单元详情-采样结束日期',
    width: 100,
    dataIndex: 'dtCyedate',
    align: 'center'
},
{
    title: '采样单元详情-采样结束时间',
    width: 100,
    dataIndex: 'dtCyetime',
    align: 'center'
},
{
    title: '采样单元详情-采样设备名称',
    width: 100,
    dataIndex: 'dtCysbmc',
    align: 'center'
},
{
    title: '采样单元详情-采样设备ID',
    width: 100,
    dataIndex: 'dtCysbid',
    align: 'center'
},
{
    title: '采样单元详情-采样单元煤量',
    width: 100,
    dataIndex: 'dtCydyml',
    align: 'center'
},
{
    title: '采样单元详情-采样间隔时间',
    width: 100,
    dataIndex: 'dtCyjgsj',
    align: 'center'
},
{
    title: '采样单元详情-初级子样量',
    width: 100,
    dataIndex: 'dtCjzyl',
    align: 'center'
},
{
    title: '采样单元详情-一级缩分时间',
    width: 100,
    dataIndex: 'dtYijisfsj',
    align: 'center'
},
{
    title: '采样单元详情-一级缩分间隔',
    width: 100,
    dataIndex: 'dtYijisfjg',
    align: 'center'
},
{
    title: '采样单元详情-一级缩分延迟时间',
    width: 100,
    dataIndex: 'dtYijisfcysj',
    align: 'center'
},
{
    title: '采样单元详情-一级缩分次数',
    width: 100,
    dataIndex: 'dtYijisfcs',
    align: 'center'
},
{
    title: '采样单元详情-二级缩分时间',
    width: 100,
    dataIndex: 'dtErjisfsj',
    align: 'center'
},
{
    title: '采样单元详情-二级缩分间隔',
    width: 100,
    dataIndex: 'dtErjisfjg',
    align: 'center'
},
{
    title: '采样单元详情-二级缩分延迟时间',
    width: 100,
    dataIndex: 'dtErjisfcysj',
    align: 'center'
},
{
    title: '采样单元详情-二级缩分次数',
    width: 100,
    dataIndex: 'dtErjisfcs',
    align: 'center'
},
{
    title: '采样单元详情-采样总量',
    width: 100,
    dataIndex: 'dtCyzl',
    align: 'center'
},
{
    title: '采样单元详情-留样桶数',
    width: 100,
    dataIndex: 'dtLytongshu',
    align: 'center'
},
{
    title: '采样单元详情-留样总量',
    width: 100,
    dataIndex: 'dtYlzl',
    align: 'center'
}
];
</script>