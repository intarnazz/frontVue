<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const isLoading = ref(true);
const title = ref("");
const body = ref("");
const route = useRoute();

onMounted(async () => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
    .then((response) => response.json())
    .then((json) => {
      title.value = json.title;
      body.value = json.body;
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <h2 v-if="isLoading">
    Загрузка...
  </h2>
  <template v-else>
    <h2 class="title">
      {{ title }}
    </h2>
    <p>
      {{ body }}
    </p>
  </template>
</template>

<style lang="sass" scoped>
.title
  color: #42b983
</style>
