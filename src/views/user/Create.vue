<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item><RouterLink to="/user">用户管理</RouterLink></a-breadcrumb-item>
            <a-breadcrumb-item>新建用户</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <a-form name="custom-validation" ref="formRef" :model="formState" :rules="rules" v-bind="layout"
                @finish="handleFinish" @finishFailed="handleFinishFailed">
                <a-form-item has-feedback label="用户名" name="username">
                    <a-input v-model:value="formState.username" type="text" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="Password" name="password">
                    <a-input v-model:value="formState.password" type="password" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="Confirm" name="checkPass">
                    <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
                </a-form-item>
            </a-form>
        </div>
    </a-layout-content>
</template>
<script setup>
import { reactive, ref, inject } from 'vue';

const formRef = ref();
const formState = reactive({
    username: '',
    password: '',
    checkPass: ''
});

let validateUsername = async (rule, value) => {
    if (value === '') {
        return Promise.reject('请输入用户名');
    }

    return Promise.resolve();
};

let validatePass = async (rule, value) => {
    if (value === '') {
        return Promise.reject('请输入密码');
    } if (value.length < 4) {
        return Promise.reject('密码长度密码大于4位');
    } else {
        if (formState.checkPass !== '') {
            formRef.value.validateFields('checkPass');
        }

        return Promise.resolve();
    }
};

let validatePass2 = async (rule, value) => {
    if (value === '') {
        return Promise.reject('请输入确认密码');
    } else if (value !== formState.password) {
        return Promise.reject("密码与确认密码不匹配!");
    } else {
        return Promise.resolve();
    }
};

const rules = {
    username: [
        {
            required: true,
            validator: validateUsername,
            trigger: 'change'
        }
    ],
    password: [
        {
            required: true,
            validator: validatePass,
            trigger: 'change',
        },
    ],
    checkPass: [
        {
            required: true,
            validator: validatePass2,
            trigger: 'change',
        },
    ]
};

const layout = {
    labelCol: {
    span: 4,
    },
    wrapperCol: {
    span: 14,
    },
};

const handleFinish = values => {
    createUser(values);
};

const handleFinishFailed = errors => {
    console.log(errors);
};

const resetForm = () => {
    formRef.value.resetFields();
};

import { notification } from 'ant-design-vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
const cicsUrl = inject('cicsUrl')
const router = useRouter()
const createUser = (data) => {
    axios({
        method: 'post',
        url: cicsUrl + '/user/create',
        headers: {
            "Authorization":localStorage.getItem('token')
        },
        data: data
    }).then(function (response) {
        if (response.data.success) {
            alert('用户创建成功')
            router.push('/user');
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
            description: response.data.errorMsg,
            duration: 20,
        });
    });
};
</script>