<template>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl">
            <div class="flex flex-row border-b border-theme-gray-border h-screen">
                <div class="flex flex-col w-2/6 max-h-screen overflow-y-auto">
                    <div class="flex flex-row items-center justify-center gap-3 px-3 py-2 mx-3 mt-2 border rounded-full border-theme-gray-border">
                        <div>
                            <input class="w-full text-sm outline-none" type="text" placeholder="Search direct messages" />
                        </div>
                    </div>
                    <div class="flex flex-col mt-3 pr-5">
                        <div v-for="user in users" :key="user.id" @click="selectUser(user)" class="flex flex-row mb-2 p-4" :class="selectedUser.id == user.id ? 'bg-theme-gray' : 'cursor-pointer hover:bg-theme-gray'">
                            <div class="mr-3">
                                <img class="rounded-full w-12" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" :alt="user.name" />
                            </div>
                            <div class="flex flex-col w-full">
                                <div class="flex flex-row items-center gap-1">
                                    <div class="flex flex-col">
                                        <div class="text-sm">{{ user.name }}</div>
                                    </div>
                                    <div class="text-xs ml-auto">
                                    {{ user.messages[0].created_at }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-4/6 border-l border-r border-theme-gray-border">
                    <div class="flex flex-col items-center justify-center pb-10 mt-3 border-b border-theme-gray-borders">
                        <div class="mt-1 font-semibold">Ahsan Hanif</div>
                        <div class="text-sm text-theme-gray-dark">@ahsanhanif99</div>
                        <div class="flex flex-row items-center mt-4 text-sm text-theme-gray-dark">
                            <div>12/11/2022</div>
                            <div>. 10k Followers</div>
                        </div>
                    </div>
                    <div class="flex flex-col h-full pt-5">
                        <div class="flex flex-col overflow-y-auto h-max-500p">
                            <div v-for="message in partnerChat" :key="message.id" class="flex flex-col px-3 mb-4 text-sm w-fit" :class="message.from_user_id == selectedUser.id ? 'self-end' : 'self-start'">
                                <div class="p-3 mb-1 text-center text-white bg-theme-blue rounded-xl" :class="message.from_user_id == selectedUser.id ? 'rounded-br-sm' : 'rounded-bl-sm'">
                                {{ message.message }}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row p-2 mt-auto border-t border-theme-gray-border">
                            <div class="relative w-full">
                                <input v-model="newMessage" class="w-full p-4 rounded-lg outline-none bg-theme-gray-light" type="text" placeholder="start a new message" />
                                <div @click="proceedSendMessage" :class="{ 'opacity-50': newMessage.length === 0, 'cursor-pointer hover:bg-gray-300': newMessage.length > 0 }" class="absolute p-2 rounded-full right-4 top-2">
                                    <button>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chat from "@/composables/Chat.js"
import { io } from 'socket.io-client'

const { userChat, sendMessage } = Chat()
const users = ref([])
const selectedUser = ref(users.value[0])
const newMessage = ref("")
const partnerChat = ref([])
const token = localStorage.getItem("authToken")
const socket = ref();

const selectUser = (user) => {
    selectedUser.value = user
    partnerChat.value = selectedUser.value.messages
}

const proceedSendMessage = () => {
    
    if(newMessage.value != ''){

        sendMessage(token, selectedUser.value.id, newMessage.value).then((data) => {

            socket.value.emit('chat message', newMessage.value);
            newMessage.value = ''
            loadUserChat(token)
        })
    }
}

const loadUserChat = (token) => {
    userChat(token).then((data) => {

    const response = JSON.parse(JSON.stringify(data))

        if(response.data){

            selectedUser.value = response.data.messages[0]
            users.value = response.data.messages
            partnerChat.value = selectedUser.value.messages
        }else{

            console.log(response)
        }
    })
}

onMounted(() => {

    loadUserChat(token)

    socket.value = io('http://localhost:3000')

    socket.value.on('chat message', (message) => {
        loadUserChat(token)
    })
})

</script>