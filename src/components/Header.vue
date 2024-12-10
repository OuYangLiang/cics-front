<template>
<a-layout-header style="background: #3F9FCC; padding: 0; text-align: center" theme="light">
    <div style="font-size: 23px;">
        承德热电煤炭数据直连管控平台

        <div style="float:right; padding-right: 30px;" >
            <a-button @click.prevent="logout" ><PoweroffOutlined />退出</a-button>
        </div>

        <div style="float:right; padding-right: 30px;" >
            <a-typography-text type="info">当前用户：{{ currentLogin }}</a-typography-text>
        </div>
    </div>
</a-layout-header>
</template>

<script setup>
import { PoweroffOutlined } from '@ant-design/icons-vue';

const currentLogin = localStorage.getItem('currentLogin')

import { useRouter } from 'vue-router'
const router = useRouter()
function logout() {
    localStorage.removeItem('token');
    router.push('/login')
}
</script>

