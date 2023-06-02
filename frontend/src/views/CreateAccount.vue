<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
            <div class="p-8">
                <div class="flex items-center justify-center mb-8">
                    <img src="/assets/images/logo.png" class="w-8 h-6" alt="" />
                </div>
                <h2 class="mb-4 text-2xl font-bold text-gray-800">Create Account</h2>
                <div class="mt-5 flex flex-col gap-1">
                    <input type="text" placeholder="Email" v-model="email" class="w-full px-4 py-2 border rounded border-grey-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    <div class="text-sm text-theme-red" v-if="error.email">{{ error.email }}</div>
                </div>
                <div class="mt-5">
                    <input type="text" placeholder="Full Name" v-model="name" class="w-full px-4 py-2 border rounded border-grey-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                </div>
                <div class="mt-5 flex flex-col gap-1">
                    <input type="password" placeholder="Password" v-model="password" class="w-full px-4 py-2 border rounded border-grey-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    <div class="text-sm text-theme-red" v-if="error.password">{{ error.password }}</div>
                </div>
                <div class="mt-5 flex flex-col gap-1">
                    <input type="password" placeholder="Password Confirmation" v-model="passwordConfirmation" class="w-full px-4 py-2 border rounded border-grey-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    <div class="text-sm text-theme-red" v-if="error.password2">{{ error.password2 }}</div>
                </div>
                <div class="mt-10">
                <button type="button" :class="!loading ? 'hover:bg-blue-600' : 'cursor-not-allowed'" @click="proceedSignup" class="w-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-blue-500 rounded-3xl">
                    Sign up
                </button>
                <div class="flex ml-2">
                    <RouterLink :to="{ name: 'Login' }">
                    <p class="mt-2 text-xs text-blue-500 cursor-pointer hover:underline">
                        Already have an account ?&nbsp;<span class="font-bold"> Login</span>
                    </p>
                    </RouterLink>
                </div>
                </div>
                <div class="mt-5">
                <div class="text-sm text-theme-green font-semibold" v-if="success">{{ success }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import Auth from "@/composables/Auth.js"
  
  const { signup } = Auth()
  const email = ref('')
  const name = ref('')
  const password = ref('')
  const passwordConfirmation = ref('')
  const loading = ref(false)
  const success = ref(false)
  const error = reactive({
  
    email: false,
    password: false,
    password2: false
  })
  const proceedSignup = () => {
  
    if(!loading.value){
  
      loading.value = true
      resetErrors()
  
      let data = {
        email: email.value,
        name: name.value,
        password: password.value,
        password2: passwordConfirmation.value
      }
      signup(data).then((returnData) => {
  
        loading.value = false
        const response = JSON.parse(JSON.stringify(returnData))
  
        if(response.status == 201){
  
          success.value = 'Your account has been created successfully'
          resetForm()
        }else{
  
          if(response.data){
  
            for (let key in error) {
              if (key in response.data) {
                
                error[key] = response.data[key][0]
              }
            }
          }
        }
      })
    }
  }
  
  const resetErrors = () => {
  
    success.value = false
    Object.keys(error).forEach(key => error[key] = false)
  }
  
  const resetForm = () => {
  
    email.value = name .value = password.value = passwordConfirmation.value = ''
  }
  
  </script>
  