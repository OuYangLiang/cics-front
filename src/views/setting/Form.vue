<template>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

        <a-form-item label="自动提交">
            <a-switch v-model:checked="formState.autoUpload" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">保存</a-button>
        </a-form-item>

    </a-form>
</template>
<script setup>
import { reactive, toRaw, inject, onMounted } from 'vue';

const formState = reactive({
    autoUpload: false,
});

import { notification } from 'ant-design-vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
const cicsUrl = inject('cicsUrl')
const router = useRouter()
const query = () => {
    axios({
        method: 'post',
        url: cicsUrl + '/setting/query',
        headers: {
            "Authorization":localStorage.getItem('token')
        }
    }).then(function (response) {
        if (response.data.success) {
            formState.autoUpload = response.data.data.autoUpload;
        } else {
            notification.error({
                message: '错误',
                description: response.data.errorMsg,
                duration: 20,
            });
        }
    }).catch(function (error) {
        console.log(error);
        notification.error({
            message: '异常',
            description: error,
            duration: 20,
        });
    });
};

onMounted(() => {
    query();
})

const onSubmit = () => {
    save(toRaw(formState))
};

const labelCol = {
style: {
    width: '150px',
},
};

const wrapperCol = {
span: 14,
};

const save = (data) => {
    axios({
        method: 'post',
        url: cicsUrl + '/setting/save',
        headers: {
            "Authorization":localStorage.getItem('token')
        },
        data: {"autoUpload": data.autoUpload}
    }).then(function (response) {
        if (response.data.success) {
            alert('保存成功')
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
    }).catch(function (error) {
        console.log(error);
        notification.error({
            message: '异常',
            description: error,
            duration: 20,
        });
    });
};
</script>