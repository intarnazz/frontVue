<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink class="registration" :to="{ name: 'registration' }">Registration</RouterLink> |
    <RouterLink class="login" :to="{ name: 'login' }">Authentication</RouterLink> |
    <RouterLink class="profile" :to="{ name: 'profile' }">Profile</RouterLink>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.RouterLink-exact-active {
  color: #42b983;
}
</style>
