<template>
  <div class="wrapper-nav">
    <nav class="app__nav">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink :to="{ name: 'registration' }">Registration</RouterLink> |
      <RouterLink :to="{ name: 'login' }">Authentication</RouterLink> |
      <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
    </nav>
  </div>
  <router-view />
</template>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  &__nav
    margin: auto

.wrapper-nav
  display: flex
  justify-content: center
nav
  padding: 30px

nav a
  font-weight: bold
  color: #2c3e50
</style>
