<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #title>Header</template>
    <template #footer>Footer {{ parameter.page }} | {{ parameter.pageSize }} | {{ parameter.phoneNum }} |{{ parameter.employeeNamePrefix }} | {{
      parameter.department }}</template>
  </a-table>
</template>
<script setup>
import axios from 'axios'
import { watch, ref, reactive, defineExpose } from 'vue';

const props = defineProps({
  param: Object
})

const parameter = reactive(props.param);

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    className: 'column-money',
    dataIndex: 'employeeName',
  },
  {
    title: '电话号码',
    className: 'column-money',
    dataIndex: 'phone',
  },
  {
    title: '部门',
    dataIndex: 'department',
  },
  {
    title: '薪水',
    dataIndex: 'salary',
  },
];

const data = reactive([
  {
    id: 1,
    employeeName: '喻敏',
    phone: '18651612595',
    department: '研发中心',
    salary: 18999
  },
  {
    id: 2,
    employeeName: '喻敏2',
    phone: '18651612593',
    department: '研发中心',
    salary: 18998
  }
]);

// axios({
//     method: 'post',
//     url: 'http://localhost:8080/employee/search',
//     headers: {
//         "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjgxOTY4MjcsImlhdCI6MTcyODExMDQyNywidXNlcm5hbWUiOiJveWwifQ.7pnJiBvPe81IH5bTQpvUUigpTuvh6nQwMHm6s1LRfXU"
//     },
//     data: formState
// }).then(function (response) {
//     const resp = response.data;
//     if (resp.success) {
//         console.log(resp.data)
//         data = resp.data.records;
//         console.log(data)
//     } else {
//         alert(resp.errorMsg);
//     }
// }).catch(function (error) {
//     console.log(error);
// });



function refresh() {
    console.log("called.");
    data.push({"id":3, "phone":"18651612595", "employeeName":"欧阳", "department":"设计中心", "salary":4800000})
}

defineExpose({
    refresh
});

</script>