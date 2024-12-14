<template>
    <a-layout-content style="margin: 0 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>配置管理</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <Form />
        </div>
    </a-layout-content>
</template>
<script setup>
import Form from './Form.vue';
</script>