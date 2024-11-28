<template>
    <a-layout style="min-height: 100vh">
        <Menu selectedKeys="user"/>

        <a-layout >
            <Header />

            <div style="min-height: 83vh">
                <a-layout-content style="margin: 0 16px">
                    <a-breadcrumb style="margin: 16px 0">
                        
                    </a-breadcrumb>
                    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                        aaa
                    </div>
                </a-layout-content>
            </div>

            <Footer />
        </a-layout>
    </a-layout>
</template>
<script setup>
import Menu from '@/components/Menu.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import { ref } from 'vue'

</script>