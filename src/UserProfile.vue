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
  <h2>profile:</h2>
  <p>id: {{ id }}</p>
  <p>login: {{ login }}</p>
  <p>password: {{ password }}</p>
</template>

<style lang="sass">
.profile
  color: #42b983
</style>
