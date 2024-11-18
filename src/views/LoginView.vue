<template>
  <div class="fullscreen-background">
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
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
import { notification } from 'ant-design-vue';

const router = useRouter()

const formState = reactive({
  username: '',
  password: '',
  remember: true,
});

const onFinish = values => {
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
            localStorage.setItem('token', resp.data);
            localStorage.setItem('currentLogin', formState.username);
            router.push('/guidaoheng');
        } else {
            // alert(resp.errorMsg);
            notification.error({
                message: '错误',
                description: resp.errorMsg,
                duration: 2,
            });
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
  position: fixed; /* 使div相对于视窗固定 */
  top: 50%; /* 定位div至视窗的垂直中间 */
  left: 50%; /* 定位div至视窗的水平中间 */
  transform: translate(-50%, -50%); /* 使用transform将div向上和向左移动自身宽度和高度的一半，实现居中 */
  width: 500px;
}

.fullscreen-background {
  width: 100vw;            /* 宽度为视口宽度 */
  height: 100vh;           /* 高度为视口高度 */
  background-image: url('/public/bg.png'); /* 背景图片路径 */
  background-size: cover;  /* 背景图片覆盖整个div */
  background-repeat: no-repeat; /* 背景图片不重复 */
  background-position: center; /* 背景图片居中 */
}
</style>