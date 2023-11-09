import { createRouter, createWebHistory } from "vue-router";
// import App from "./App.vue";
import Registration from "./Registration.vue";
const routes = [
  // { path: "/", component: App },
  { path: "/auth/registration", component: Registration },
  //   { path: "/profile", component: /* ваш компонент для профиля */ },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
