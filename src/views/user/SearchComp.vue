<template>
    <div>
        <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="formState" @finish="onFinish">
            <a-row :gutter="24">

                <a-col :span="8">
                    <a-form-item :name="`mybs`" :label="`用户名`">
                        <a-input v-model:value="props.formState.usernamePrefix" placeholder="请输入用户名"></a-input>
                    </a-form-item>
                </a-col>

            </a-row>
            
            <a-row>
                <a-col :span="24" style="text-align: right">
                    <a-button type="primary" html-type="submit">Search</a-button>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>
<script setup>
const props = defineProps({formState: Object})
const emit = defineEmits(['searchEvent'])

const onFinish = () => {
    try {
        emit("searchEvent");
    } catch (e) {
        console.log(e);
    }
    
};
</script>
<style scoped>
.ant-form {
    max-width: none;
}

.search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

[data-theme='dark'] .ant-advanced-search-form {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid #434343;
    padding: 24px;
    border-radius: 2px;
}

[data-theme='dark'] .search-result-list {
    border: 1px dashed #434343;
    background: rgba(255, 255, 255, 0.04);
}
</style>