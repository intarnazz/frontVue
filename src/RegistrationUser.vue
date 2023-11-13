<script setup>
import { ref } from "vue";

const HOST = "http://localhost:7123";
const login = ref("");
const password = ref("");
const userMassage = ref(null);
const userMassageType = ref(null);
const userMassageLogin = ref(null);
const userMassagePSW = ref(null);
const errorEvent = ref(false);

const registration = async () => {
  if (login.value.length <= 4) {
    userMassageLogin.value = "имя меньше четырёх символов";
    errorEvent.value = true;
  } else if (login.value.includes(" ")) {
    userMassageLogin.value = "имя сожержит пробелы";
    errorEven.valuet = true;
  }
  if (password.value.length <= 4) {
    userMassagePSW.value = "Пароль меньше четырёх символов";
    errorEvent.value = true;
  } else if (password.value.includes(" ")) {
    userMassagePSW.value = "Пароль сожержит пробелы";
    errorEvent.value = true;
  }
  if (!errorEvent) {
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
        }
        if (response.code === 400) {
          userMassage.value = false;
        }
      });
    });
  }
};
</script>

<template>
  <form @submit.prevent="registration">
    <p>
      <label for="text">login: </label
      ><input v-model="login" name="login" type="text" />
      <samp class="error">{{ userMassageLogin }}</samp>
    </p>
    <p>
      <label for="psw">password: </label
      ><input v-model="password" name="password" type="password" />
      <samp class="error">{{ userMassagePSW }}</samp>
    </p>
    <p><input type="submit" /></p>
  </form>
  <div v-if="userMassageType" class="ok">{{ userMassage }}</div>
  <div v-if="userMassageType === false" class="error">{{ userMassage }}</div>
</template>
