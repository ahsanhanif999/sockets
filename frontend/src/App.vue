<template>

  <Main v-if="isLoggedIn">
    <!-- Route dynamic content -->
    <router-view />
  </Main>

  <CreateAccount v-else-if="$route.name == 'CreateAccount'" />

  <Login @response="checkLogin" v-else />

</template>

<script setup>
import { ref } from "vue"
import Main from "@/layouts/Main.vue"
import CreateAccount from "@/views/CreateAccount.vue"
import Login from "@/views/Login.vue"
import { useRouter } from 'vue-router'

const router = useRouter()
const token = ref(localStorage.getItem('authToken'))
const isLoggedIn = ref(token.value !== null && token.value != '' ? true : false)

const checkLogin = (response) => {
  
  isLoggedIn.value = true
  router.push({ name: 'Chat' })
}

</script>