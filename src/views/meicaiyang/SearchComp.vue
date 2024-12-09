<template>
    <div>
        <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="formState" @finish="onFinish">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item :name="`ywrqRange`" :label="`业务日期`">
                        <a-range-picker v-model:value="props.formState.ywrqRange" valueFormat="YYYY-MM-DD" format="YYYY-MM-DD" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item :name="`mybs`" :label="`批次煤样标识`">
                        <a-input v-model:value="props.formState.mybs" placeholder="请输入批次煤样标识"></a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            
            <a-row>
                <a-col :span="8">
                    <a-form-item :name="`uploadStatus`" :label="`上报状态`">
                        <a-select v-model:value="props.formState.uploadStatus">
                            <a-select-option value="">全部</a-select-option>
                            <a-select-option value="success">上报成功</a-select-option>
                            <a-select-option value="failed">上报失败</a-select-option>
                            <a-select-option value="pending">未上报</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="16" style="text-align: right">
                    <a-space>
                        <a-popconfirm title="确认同步吗?" @confirm="sync" >
                            <a-button type="primary" :loading="syncing" >
                                <CloudDownloadOutlined />同步
                            </a-button>
                        </a-popconfirm>
                        
                        <a-popconfirm title="确认上报吗?" @confirm="upload" >
                            <a-button type="primary" :loading="props.formState.loading" >
                                <UploadOutlined />上传
                            </a-button>
                        </a-popconfirm>
                        <a-button type="primary" html-type="submit"><SearchOutlined />Search</a-button>
                    </a-space>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>
<script setup>
import { ref, inject} from 'vue'
import { SearchOutlined, UploadOutlined, CloudDownloadOutlined} from '@ant-design/icons-vue';
const props = defineProps({formState: Object})
const emit = defineEmits(['searchEvent', 'uploadEvent'])

import { notification } from 'ant-design-vue';
import axios from 'axios'
const cicsUrl = inject('cicsUrl')
const syncing = ref(false);
function sync() {
    syncing.value = true;
    axios({
        method: 'post',
        url: cicsUrl + '/meicaiyang/sync',
        headers: {
            "Authorization":localStorage.getItem('token')
        }
    }).then(function (response) {
        const resp = response.data;
        if (resp.success) {
            notification.success({
                message: '同步成功',
                description: '成功同步' + resp.data + '条数据。',
                duration: 20,
            });
        } else {
            notification.error({
                message: '错误',
                description: resp.errorMsg,
                duration: 20,
            });
        }
        emit("searchEvent");
        syncing.value = false;
    }).catch(function (error) {
        console.log(error);
        syncing.value = false;
    });
};

const onFinish = () => {
    try {
        emit("searchEvent");
    } catch (e) {
        console.log(e);
    }
    
};

const upload = () => {
    try {
        emit("uploadEvent");
    } catch (e) {
        console.log(e);
    }
}
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