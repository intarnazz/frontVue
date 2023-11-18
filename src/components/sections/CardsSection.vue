<script setup>
import { onMounted, ref } from "vue";
import TodoCard from "../TodoCard.vue";

const URL = import.meta.env.VITE_API_CARD_URL;
const isLoading = ref(true);
const cardArr = ref([]);

onMounted(async () => {
  await fetch(`${URL}`)
    .then((response) => response.json())
    .then((json) => {
      cardArr.value = json.filter((i) => i.userId === 1);
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <div class="cards">
    <h1 class="cards__loading-status" v-if="isLoading">Загрузка...</h1>
    <template v-else>
      <ul class="cards__wrapper">
        <TodoCard v-for="card in cardArr" :key="card.id" :todo="card" />
      </ul>
    </template>
  </div>
</template>

<style lang="sass" scoped>
.cards
  &__wrapper
    display: flex
    align-items: center
    gap: 1em
    flex-wrap: wrap
    margin: 0
  &__loading-status
    margin: 0 auto
</style>
