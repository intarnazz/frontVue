<script setup>
import { ref } from "vue";

const HOST = import.meta.env.VITE_API_SERVER_URL;
const login = ref("");
const password = ref("");
const userMassage = ref(null);
const userMassageType = ref(null);
const userMassageLogin = ref(null);
const userMassagePSW = ref(null);
const errorEvent = ref(false);

const registration = async () => {
  if (login.value.length < 4) {
    userMassageLogin.value = "* имя меньше четырёх символов";
    errorEvent.value = true;
  } else if (login.value.includes(" ")) {
    userMassageLogin.value = "* имя сожержит пробелы";
    errorEvent.value = true;
  }
  if (password.value.length < 4) {
    userMassagePSW.value = "* Пароль меньше четырёх символов";
    errorEvent.value = true;
  } else if (password.value.includes(" ")) {
    userMassagePSW.value = "* Пароль сожержит пробелы";
    errorEvent.value = true;
  }
  if (!errorEvent.value) {
    await fetch(`${HOST}/auth/registration`, {
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
        if (response.code === 201) {
          userMassageType.value = true;
          userMassage.value = "Пользователь зарегистрирован";
        } else if (response.code === 400) {
          userMassageType.value = false;
          userMassage.value = response.message;
        } else {
          userMassageType.value = false;
          userMassage.value = "server error";
        }
      });
    });
  }
};
</script>

<template>
  <form class="form" @submit.prevent="registration">
    <div class="form__row">
      <label class="form__label" for="text">Login: </label>
      <div class="form__input-wrapper">
        <input v-model="login" class="form__input" name="login" type="text" />
        <samp class="error">{{ userMassageLogin }}</samp>
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
        <samp class="error">{{ userMassagePSW }}</samp>
      </div>
    </div>
    <p><input class="form__submit" type="submit" /></p>
  </form>
  <div v-if="userMassageType" class="ok">{{ userMassage }}</div>
  <div v-if="userMassageType === false" class="error">{{ userMassage }}</div>
</template>
