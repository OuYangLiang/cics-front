<template>
    <a-drawer width="1240" placement="right" :closable=" false " :visible=" props.detailControl.visible " @close=" onClose ">
        <a-descriptions :title="props.detailControl.record.employeeName">
            <a-descriptions-item label="明细磅单号">{{ props.detailControl.record.zmxdocNo }}</a-descriptions-item>
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
    title: '每车详情-序号',
    dataIndex: 'dtSortno',
    width: 100,
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
  }
];
</script>