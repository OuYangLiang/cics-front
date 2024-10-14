<template>
    <a-drawer width="940" placement="right" :closable=" false " :visible=" props.detailControl.visible " @close=" onClose ">
        <a-descriptions :title="props.detailControl.record.employeeName">
            <a-descriptions-item label="明细磅单号">{{ props.detailControl.record.zmxdocNo }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司">{{ props.detailControl.record.ssejdw }}</a-descriptions-item>
            <a-descriptions-item label="所属二级公司代码">{{ props.detailControl.record.ssejdwid }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司">{{ props.detailControl.record.sssjdw }}</a-descriptions-item>
            <a-descriptions-item label="所属三级公司代码">{{ props.detailControl.record.sssjdwid }}</a-descriptions-item>
            <a-descriptions-item label="装车站点">{{ props.detailControl.record.zczhandian }}</a-descriptions-item>
            <a-descriptions-item label="装车站点编码">{{ props.detailControl.record.zczhandianbm }}</a-descriptions-item>
            <a-descriptions-item label="车次">{{ props.detailControl.record.zccheci }}</a-descriptions-item>
            <a-descriptions-item label="车型">{{ props.detailControl.record.chexing }}</a-descriptions-item>
            <a-descriptions-item label="煤源矿点名称">{{ props.detailControl.record.mykuangdianmc }}</a-descriptions-item>
            <a-descriptions-item label="煤源矿点编码">{{ props.detailControl.record.mykuangdianbm }}</a-descriptions-item>
            <a-descriptions-item label="煤炭来源">{{ props.detailControl.record.meitanlaiyuan }}</a-descriptions-item>
            <a-descriptions-item label="煤炭来源编码">{{ props.detailControl.record.meitanlaiyuanbm }}</a-descriptions-item>
            <a-descriptions-item label="收货单位名称（终到用户）">{{ props.detailControl.record.zname1 }}</a-descriptions-item>
            <a-descriptions-item label="收货单位编号（终到用户）">{{ props.detailControl.record.zkunnr }}</a-descriptions-item>
            <a-descriptions-item label="销售组织描述">{{ props.detailControl.record.vtext }}</a-descriptions-item>
            <a-descriptions-item label="销售组织代码">{{ props.detailControl.record.vkorg }}</a-descriptions-item>
            <a-descriptions-item label="数据上传方式">{{ props.detailControl.record.sjscfs }}</a-descriptions-item>
            <a-descriptions-item label="首车号">{{ props.detailControl.record.shouchehao }}</a-descriptions-item>
            <a-descriptions-item label="尾车号">{{ props.detailControl.record.weichehao }}</a-descriptions-item>
            <a-descriptions-item label="车数">{{ props.detailControl.record.cheshu }}</a-descriptions-item>
            <a-descriptions-item label="计量单位">{{ props.detailControl.record.jiliangdanwei }}</a-descriptions-item>
            <a-descriptions-item label="总票重">{{ props.detailControl.record.zongpiaozhong }}</a-descriptions-item>
            <a-descriptions-item label="总毛重">{{ props.detailControl.record.zongmaozhong }}</a-descriptions-item>
            <a-descriptions-item label="总皮重">{{ props.detailControl.record.zongpizhong }}</a-descriptions-item>
            <a-descriptions-item label="总净重">{{ props.detailControl.record.zongjingzhong }}</a-descriptions-item>
            <a-descriptions-item label="总扣吨量">{{ props.detailControl.record.koudunzongliang }}</a-descriptions-item>
            <a-descriptions-item label="结算煤量">{{ props.detailControl.record.jiesuanmeiliang }}</a-descriptions-item>
        </a-descriptions>

        <a-descriptions v-for="item in props.detailControl.record.dtData" title="每车详情">
            <a-descriptions-item label="每车详情-序号">{{ item.dtSortno }}</a-descriptions-item>
            <a-descriptions-item label="每车详情-车号">{{ item.dtChehao }}</a-descriptions-item>
            <a-descriptions-item label="每车详情-车型">{{ item.dtChexing }}</a-descriptions-item>
            <a-descriptions-item label="每车详情-毛重">{{ item.dtMaozhong }}</a-descriptions-item>
            <a-descriptions-item label="每车详情-皮重">{{ item.dtPizhong }}</a-descriptions-item>
            <a-descriptions-item label="每车详情-净重">{{ item.dtJingzhong }}</a-descriptions-item>
            <a-descriptions-item label="每车详情-票重">{{ item.dtPiaozhong }}</a-descriptions-item>
        </a-descriptions>
    </a-drawer>
</template>
<script setup>
const props = defineProps({detailControl: Object})

const onClose = () => {
    props.detailControl.visible = false;
};
</script>