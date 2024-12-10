<template>
    <a-layout>
        <Header />

        <a-layout-content >
        
            <a-layout style="padding: 24px 0; background: #fff">
                <Menu />
                
                <router-view></router-view>
            </a-layout>
        </a-layout-content>

    </a-layout>
</template>
<script setup>
import Menu from '@/components/Menu.vue';
import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';
</script>