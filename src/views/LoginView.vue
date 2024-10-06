<template>
  <div class="login-form">
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入登录密码!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const formState = reactive({
  username: '',
  password: '',
  remember: true,
});

const onFinish = values => {
  console.log('Success:', values);

  axios({
      method: 'post',
      url: 'http://localhost:8080/login',
      data: {
          username: values.username,
          password: values.password
      }
  }).then(function (response) {
      const resp = response.data;
      if (resp.success) {
          router.push('/');
      } else {
          alert(resp.errorMsg);
      }
  }).catch(function (error) {
      console.log(error);
  });

};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>

<style scoped>
.login-form {
  width: 500px;
  margin: 200px auto auto 0;
}
</style>