<template>
    <component :is="this.$route.meta.layout">
        <slot />
    </component>
</template>

<script>
export default {
    name: "AppContainerLayout"
}
</script>