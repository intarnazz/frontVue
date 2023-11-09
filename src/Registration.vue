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
  <div v-if="userMassage" class="ok">Успешно</div>
  <div v-if="userMassage === false" class="error">ошибка</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      login: "",
      password: "",
      response: null,
      userMassage: null,
      push: "",
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.submitForm),
      }).then((data) => {
        data.json().then((response) => {
          console.log(response.code);
          if (response.code === 201) {
            this.userMassage = true;
          }
          if (response.code === 400) {
            this.userMassage = false;
          }
        });
      });
    },
  },
};
</script>
