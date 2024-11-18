import { createApp } from 'vue';
import router from './router'
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import { provide } from 'vue';

const app = createApp(App);


app.provide( 'cicsUrl',  'http://127.0.0.1:8080')
app.use(Antd).use(router).mount('#app');