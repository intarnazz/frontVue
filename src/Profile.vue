<template>
  <h2>Profile:</h2>
  <p>id: {{ id }}</p>
  <p>login: {{ login }}</p>
  <p>password: {{ password }}</p>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      id: "",
      login: "",
      password: "",
    };
  },
  created() {
    this.registration();
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
    token() {
      return localStorage.getItem("token");
    },
  },
  methods: {
    async registration() {
      await fetch(`${this.host}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then((data) => {
        data.json().then((response) => {
          console.log(response);
          console.log(this.token);
          if (response.code === 200) {
            this.id = response.data.id;
            this.login = response.data.login;
            this.password = response.data.password;
          } else {
            this.$router.replace("/auth/login");
          }
        });
      });
    },
  },
};
</script>
