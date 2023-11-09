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

<script>
export default {
  name: "App",
  data() {
    return {
      login: "",
      password: "",
      userMassage: null,
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
      await fetch(`${this.host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.submitForm),
      }).then((data) => {
        data.json().then((response) => {
          if (response.code === 200) {
            localStorage.setItem("token", response.data.token);
            this.userMassage = true;
          } else {
            localStorage.setItem("token", null);
            this.userMassage = false;
          }
        });
      });
    },
  },
};
</script>
