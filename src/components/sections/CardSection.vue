<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const URL = import.meta.env.VITE_API_CARD_URL

const isLoading = ref(true);
const title = ref("");
const body = ref("");
const route = useRoute();

onMounted(async () => {
  await fetch(`${URL}/${route.params.id}`)
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
