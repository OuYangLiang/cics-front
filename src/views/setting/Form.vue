<template>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

        <a-form-item label="自动提交">
            <a-switch v-model:checked="formState.autoUpload" />
        </a-form-item>

        <a-form-item has-feedback label="轨道衡上传时间" name="timeUploadGuidaoheng">
            <a-input v-model:value="formState.timeUploadGuidaoheng" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item has-feedback label="汽车衡上传时间" name="timeUploadQichecheng">
            <a-input v-model:value="formState.timeUploadQichecheng" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item has-feedback label="汽车机械采样上传时间" name="timeUploadMeicaiyang">
            <a-input v-model:value="formState.timeUploadMeicaiyang" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item has-feedback label="皮带煤流采样上传时间" name="timeUploadPidaimeicaiyang">
            <a-input v-model:value="formState.timeUploadPidaimeicaiyang" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item has-feedback label="煤质数据上传时间" name="timeUploadMeizhi">
            <a-input v-model:value="formState.timeUploadMeizhi" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item has-feedback label="化验单上传时间" name="timeUploadHuayandan">
            <a-input v-model:value="formState.timeUploadHuayandan" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item has-feedback label="煤质快检化验上传时间" name="timeUploadKjhuayandan">
            <a-input v-model:value="formState.timeUploadKjhuayandan" type="text" autocomplete="off" />
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
    timeUploadGuidaoheng:23, 
    timeUploadQichecheng:23,
    timeUploadMeicaiyang:23,
    timeUploadPidaimeicaiyang:23,
    timeUploadMeizhi:23,
    timeUploadHuayandan:23,
    timeUploadKjhuayandana:23,
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
            formState.timeUploadGuidaoheng = response.data.data.timeUploadGuidaoheng;
            formState.timeUploadQichecheng = response.data.data.timeUploadQichecheng;
            formState.timeUploadMeicaiyang = response.data.data.timeUploadMeicaiyang;
            formState.timeUploadPidaimeicaiyang = response.data.data.timeUploadPidaimeicaiyang;
            formState.timeUploadMeizhi = response.data.data.timeUploadMeizhi;
            formState.timeUploadHuayandan = response.data.data.timeUploadHuayandan;
            formState.timeUploadKjhuayandan = response.data.data.timeUploadKjhuayandan;
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
        data: data
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