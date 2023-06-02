import { createWebHistory, createRouter } from "vue-router";
import Chat from "@/views/Chat.vue";
import Login from "@/views/Login.vue";
import CreateAccount from "@/views/CreateAccount.vue";

const routes = [
  {
    path: "/",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/create-account",
    name: "CreateAccount",
    component: CreateAccount,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;