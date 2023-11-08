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
      try {
        const response = await fetch(`${this.host}/auth/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.submitForm),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        this.response = responseData;
        console.log(this.response);
      } catch (error) {
        console.log("Error registration() - ", error);
      }
    },
  },
};
</script>
