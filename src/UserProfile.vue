<script setup>
import { ref } from "vue";

const HOST = "http://localhost:7123";
const id = ref("");
const login = ref("");
const password = ref("");
const token = localStorage.getItem("token");

const profile = async () => {
  await fetch(`${HOST}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    data.json().then((response) => {
      if (response.code === 200) {
        id.value = response.data.id;
        login.value = response.data.login;
        password.value = response.data.password;
      } else {
        this.$router.replace("/auth/login");
      }
    });
  });
};
profile();
</script>

<template>
  <div class="user-profile">
    <h2 class="user-profile__title">profile:</h2>
    <p class="user-profile__info">id: {{ id }}</p>
    <p class="user-profile__info">login: {{ login }}</p>
    <p class="user-profile__info">password: {{ password }}</p>
  </div>
</template>

<style lang="sass">
.user-profile
  display: flex
  flex-direction: column
  &__title
    color: #42b983
    font-size: 2em
  &__info
    font-size: 1.5em
</style>
