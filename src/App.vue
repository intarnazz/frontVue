<template>
  <form @submit.prevent="registration">
    <p>
      <label for="text">login: </label><input v-model="login" type="text" />
    </p>
    <p>
      <label for="psw">password: </label
      ><input v-model="password" type="password" />
    </p>
    <p><input type="submit" /></p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      login: "",
      password: "",
      response: null,
    };
  },
  computed: {
    host() {
      return "http://localhost:7123";
    },
    submitForm() {
      return {
        login: this.login,
        password: this.password,
      };
    },
  },
  methods: {
    async registration() {
      axios
        .post(`${this.host}/auth/registration`, this.submitForm)
        .then((response) => {
          console.log(this.submitForm);
          this.response = response.data;
          console.log(this.response);
        })
        .catch((e) => {
          console.log("Error registration() - ", e);
        });
    },
  },
};
</script>
