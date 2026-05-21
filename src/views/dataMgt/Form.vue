<template>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item has-feedback label="批次编号" name="batchNo">
            <a-input v-model:value="formState.batchNo" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" :loading="loading" @click="onSubmit">提交</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>
import { reactive, ref, inject } from 'vue';
import { Modal, notification } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const formState = reactive({
    batchNo: '',
});

const loading = ref(false);
const cicsUrl = inject('cicsUrl');
const router = useRouter();

const labelCol = {
    style: {
        width: '150px',
    },
};

const wrapperCol = {
    span: 14,
};

const onSubmit = () => {
    if (!formState.batchNo?.trim()) {
        notification.warning({
            message: '提示',
            description: '请输入批次编号',
        });
        return;
    }

    loading.value = true;
    axios({
        method: 'post',
        url: cicsUrl + '/dataMgt/remove',
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        data: {
            batchNo: formState.batchNo.trim(),
        },
    })
        .then(function (response) {
            if (response.data.success) {
                Modal.info({
                    title: '处理结果',
                    content: response.data.data,
                    okText: '确定',
                });
            } else {
                if (response.data.errorCode == 0) {
                    router.push('/login');
                }

                notification.error({
                    message: '错误',
                    description: response.data.errorMsg,
                    duration: 20,
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: '异常',
                description: error,
                duration: 20,
            });
        })
        .finally(() => {
            loading.value = false;
        });
};
</script>
