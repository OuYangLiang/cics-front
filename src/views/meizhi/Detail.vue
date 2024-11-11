<template>
    <a-drawer width="1240" placement="right" :closable=" false " :visible=" props.detailControl.visible " @close=" onClose ">
        <a-descriptions :title="props.detailControl.record.employeeName">
            <a-descriptions-item label="批次煤样标识">{{ props.detailControl.record.mybs }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司">{{ props.detailControl.record.ssejdw }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司代码">{{ props.detailControl.record.ssejdwid }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司">{{ props.detailControl.record.sssjdw }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司代码">{{ props.detailControl.record.sssjdwid }}</a-descriptions-item>
        </a-descriptions>

        <a-table :columns="columns" :data-source="props.detailControl.record.dtHydbhxq"  size="small" bordered />
    </a-drawer>
</template>
<script setup>
const props = defineProps({detailControl: Object})

const onClose = () => {
    props.detailControl.visible = false;
};

const columns = [
{
    title: '批次煤样标识',
    dataIndex: 'mybs',
    width: 100,
    align: 'center'
  },
  {
    title: '化验单1ID',
    width: 100,
    dataIndex: 'dtHyd1id',
    align: 'center'
  },
  {
    title: '化验单2ID',
    width: 100,
    dataIndex: 'dtHyd2id',
    align: 'center'
  },
  {
    title: '化验单3ID',
    width: 100,
    dataIndex: 'dtHyd3id',
    align: 'center'
  },
  {
    title: '化验单4ID',
    width: 100,
    dataIndex: 'dtHyd4id',
    align: 'center'
  },
  {
    title: '化验单5ID',
    width: 100,
    dataIndex: 'dtHyd5id',
    align: 'center'
  },
  {
    title: '化验单6ID',
    width: 100,
    dataIndex: 'dtHyd6id',
    align: 'center'
  },
  {
    title: '化验单7ID',
    width: 100,
    dataIndex: 'dtHyd7id',
    align: 'center'
  },
  {
    title: '化验单8ID',
    width: 100,
    dataIndex: 'dtHyd8id',
    align: 'center'
  }
];
</script>