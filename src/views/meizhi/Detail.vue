<template>
    <a-drawer width="1240" placement="right" :closable=" false " :visible=" props.detailControl.visible " @close=" onClose ">
        <a-descriptions :title="props.detailControl.record.employeeName">
            <a-descriptions-item label="批次煤样标识">{{ props.detailControl.record.mybs }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司">{{ props.detailControl.record.ssejdw }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司代码">{{ props.detailControl.record.ssejdwid }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司">{{ props.detailControl.record.sssjdw }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司代码">{{ props.detailControl.record.sssjdwid }}</a-descriptions-item>
        </a-descriptions>

        <a-table :columns="columns" :data-source="props.detailControl.record.dtData"  size="small" bordered />
    </a-drawer>
</template>
<script setup>
const props = defineProps({detailControl: Object})

const onClose = () => {
    props.detailControl.visible = false;
};

const columns = [
  {
    title: '采样单元序号',
    dataIndex: 'dtCydyxh',
    width: 100,
    align: 'center'
  },
  {
    title: '采样单元编码',
    width: 100,
    dataIndex: 'dtCydybm',
    align: 'center'
  },
  {
    title: '采样方式',
    width: 100,
    dataIndex: 'dtCyfs',
    align: 'center'
  }
];
</script>