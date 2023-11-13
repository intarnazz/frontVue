<script setup>
import { ref } from "vue";
const HOST = "http://localhost:7123";
const login = ref("");
const password = ref("");
const userMassage = ref(null);
const userMassageErr = ref(null);

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
      console.log(response)
      if (response.code === 200) {
        localStorage.setItem("token", response.data.token);
        userMassageErr.value = true;
      } else if (response.code === 401) {
        localStorage.setItem("token", null);
        userMassageErr.value = false;
        userMassage.value = response.message
      } else {
        userMassageErr.value = false;
        userMassage.value = "ошибка сервера"
      }
    });
  });
};
</script>

<template>
  <form class="form" @submit.prevent="registration">
    <div class="form__row">
      <label class="form__label" for="text">Login: </label>
      <div class="form__input-wrapper">
        <input v-model="login" class="form__input" name="login" type="text" />
      </div>
    </div>
    <div class="form__row">
      <label class="form__label" for="psw">Password: </label>
      <div class="form__input-wrapper">
        <input
          v-model="password"
          class="form__input"
          name="password"
          type="password"
        />
      </div>
    </div>
    <p><input class="form__submit" type="submit" /></p>
  </form>
  <div v-if="userMassageErr" class="ok">Успешно</div>
  <div v-if="userMassageErr === false" class="error">{{ userMassage }}</div>
</template>
