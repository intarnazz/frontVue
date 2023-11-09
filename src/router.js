import { createRouter, createWebHistory } from "vue-router";
// import App from "./App.vue";
import Registration from "./Registration.vue";
import Authentication from "./Authentication.vue";
import Profile from "./Profile.vue";
const routes = [
  // { path: "/", component: App },
  { path: "/auth/registration", component: Registration },
  { path: "/auth/login", component: Authentication },
  { path: "/users/profile", component: Profile },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
