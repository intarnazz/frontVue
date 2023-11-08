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
      await fetch(`${this.host}/auth/registration`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.submitForm),
      }).then((data) => {
        console.log(data);
      });
    },
  },
};
</script>
