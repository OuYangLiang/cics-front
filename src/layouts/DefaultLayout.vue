<template>
    <a-layout style="min-height: 100vh">
        <Menu />

        <a-layout >
            <Header />

            <div style="min-height: 83vh">
                <router-view></router-view>
            </div>

            <!-- <Footer /> -->
        </a-layout>
    </a-layout>
</template>
<script setup>
import Menu from '@/components/Menu.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>