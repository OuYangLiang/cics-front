<template>
    <div>
        <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="formState" @finish="onFinish">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item :name="`zmxdocNo`" :label="`明细磅单号`">
                        <a-input v-model:value="formState.zmxdocNo" placeholder="请输入明细磅单号"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item :name="`sssjdw`" :label="`所属三级公司`">
                        <a-input v-model:value="formState.sssjdw" placeholder="请输入"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item :name="`mykuangdianmc`" :label="`煤源矿点名称`">
                        <a-input v-model:value="formState.mykuangdianmc" placeholder="请输入"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item :name="`yewurqRange`" :label="`业务日期`">
                        <!-- <a-input v-model:value="formState.yewurq" placeholder="请输入"></a-input> -->
                        <a-range-picker v-model:value="formState.yewurqRange" :valueFormat="valueFormat" :format="dateFormat" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item :name="`uploadStatus`" :label="`上报状态`">
                        <!-- <a-input v-model:value="formState.uploadStatus" placeholder="请输入"></a-input> -->
                        <a-select v-model:value="formState.uploadStatus">
                            <a-select-option value="">全部</a-select-option>
                            <a-select-option value="success">上报成功</a-select-option>
                            <a-select-option value="failed">上报失败</a-select-option>
                            <a-select-option value="pending">未上报</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

            </a-row>
            
            <a-row>
                <a-col :span="24" style="text-align: right">
                    <a-button type="primary" html-type="submit">Search</a-button>
                    <!-- <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">Clear</a-button> -->
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
// const formRef = ref();
const formState = reactive({uploadStatus:''});

const emit = defineEmits(['searchEvent'])

const onFinish = () => {
    try {
        emit("searchEvent", formState);
    } catch (e) {
        console.log(e);
    }
    
};

const dateFormat = 'YYYY-MM-DD';
const valueFormat = 'YYYY-MM-DD';
</script>
<style scoped>
.ant-form {
    max-width: none;
}

.search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

[data-theme='dark'] .ant-advanced-search-form {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid #434343;
    padding: 24px;
    border-radius: 2px;
}

[data-theme='dark'] .search-result-list {
    border: 1px dashed #434343;
    background: rgba(255, 255, 255, 0.04);
}
</style>