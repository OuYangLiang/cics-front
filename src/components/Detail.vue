<template>
    <a-drawer width="640" placement="right" :closable=" false " :visible=" props.detailControl.visible " @close=" onClose ">
        <a-descriptions :title="props.detailControl.record.employeeName">
            <a-descriptions-item label="电话号码">{{ props.detailControl.record.phone }}</a-descriptions-item>
            <br /><br />
            <a-descriptions-item label="部门">{{ props.detailControl.record.department }}</a-descriptions-item>
            <a-descriptions-item label="待遇">{{ props.detailControl.record.salary }}</a-descriptions-item>
            <a-descriptions-item label="Remark">empty</a-descriptions-item>
            <a-descriptions-item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </a-descriptions-item>
        </a-descriptions>
    </a-drawer>
</template>
<script setup>
const props = defineProps({detailControl: Object})

const onClose = () => {
    props.detailControl.visible = false;
};
</script>