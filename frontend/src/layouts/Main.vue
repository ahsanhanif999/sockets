<template>
    <div class="">
        <button @click="proceedLogout">Logout</button>
        <slot></slot>
    </div>
</template>

<script setup>
import Auth from "@/composables/Auth.js"
import { useRouter } from 'vue-router'

const router = useRouter()
const { logout } = Auth()
const token = localStorage.getItem("authToken")

const proceedLogout = async () => {

    const response = await logout(token)
    if(response.status == 200){

        localStorage.removeItem('authToken')
        router.push({ name: 'Login' })
    }
}
</script>
