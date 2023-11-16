import { createRouter, createWebHistory } from "vue-router";
import Home from "../page/HomePage.vue";
import Registration from "../page/RegistrationPage.vue";
import Authentication from "../page/AuthenticationPage.vue";
import Profile from "../page/ProfilePage.vue";
import Page404 from "../page/Page404.vue";
import TodoCard from "../components/TodoCard.vue";

const HOST = "http://localhost:7123";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth/registration",
    name: "registration",
    component: Registration,
  },
  {
    path: "/todo/:id",
    name: "TodoCard",
    component: TodoCard,
  },
  {
    path: "/auth/login",
    name: "login",
    component: Authentication,
  },
  {
    path: "/users/profile",
    name: "profile",
    component: Profile,
    beforeEnter: async (to, from, next) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${HOST}/users/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.code === 200) {
            next();
          } else {
            next("/auth/login");
          }
        } catch (error) {
          console.log("Ошибка при проверке профиля:", error);
          next("/auth/login");
        }
      } else {
        next("/auth/login");
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: Page404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
