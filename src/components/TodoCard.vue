<script setup>
import { useRoute } from "vue-router";
const props = defineProps(["todo"]);
if (!props.todo) {
  const route = useRoute();
}
</script>

<template>
  <RouterLink :to="{ name: 'CardPage', params: { id: props.todo.id } }">
    <li class="card cards__item">
      <div class="card__title-wrapper">
        <h3 class="card__title">
          {{ props.todo.title }}
        </h3>
      </div>
      <div class="card__content">
        {{ props.todo.body }}
      </div>
    </li>
  </RouterLink>
</template>

<style lang="sass" scoped>
.card
  border: 2px #42b983 solid
  border-radius: 5px
  display: flex
  flex-direction: column
  width: 240px
  height: 340px
  justify-content: space-between
  &__title-wrapper
    background-color: #42b983
    padding: 1em
  &__title
    margin: 0
  &__content
    padding: 1em
.card:hover
  transition: .2s
  box-shadow: 5px 5px 0px #000
a:hover
  transition: none
  color: #000
</style>
