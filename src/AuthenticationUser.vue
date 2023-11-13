<script setup>
import { ref } from "vue";
const HOST = "http://localhost:7123";
const login = ref("");
const password = ref("");
const userMassage = ref(null);

const registration = async () => {
  await fetch(`${HOST}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login.value,
      password: password.value,
    }),
  }).then((data) => {
    data.json().then((response) => {
      if (response.code === 200) {
        localStorage.setItem("token", response.data.token);
        userMassage.value = true;
      } else {
        localStorage.setItem("token", null);
        userMassage.value = false;
      }
    });
  });
};
</script>

<template>
  <form @submit.prevent="registration">
    <p>
      <label for="text">login: </label
      ><input v-model="login" name="login" type="text" />
    </p>
    <p>
      <label for="psw">password: </label
      ><input v-model="password" name="password" type="password" />
    </p>
    <p><input type="submit" /></p>
  </form>
  <div v-if="userMassage" class="ok">Успешно</div>
  <div v-if="userMassage === false" class="error">ошибка</div>
</template>
