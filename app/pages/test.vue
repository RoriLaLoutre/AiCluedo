<template>
  <div class="p-20">
    <!-- Grille des avatars -->
    <div class="flex justify-between gap-4 mb-4">
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('avatar 1')">avatar 1</p>
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('avatar 2')">avatar 2</p>
    </div>
    <div class="flex justify-between gap-4 mb-4">
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('avatar 3')">avatar 3</p>
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('avatar 4')">avatar 4</p>
    </div>
    <div class="flex justify-center gap-4 mb-10">
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('Folder')">Folder</p>
    </div>

    <!-- Bouton start -->
    <div class="flex items-center justify-center">
      <button class="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">Start</button>
    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0  flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-xl p-8 w-96 shadow-lg text-center relative">
      <div class="flex w-full justify-between">
        <h2 class="text-2xl font-bold mb-4">Chat with {{ selectedAvatar }}</h2>
        <UButton class="text-2xl" icon="i-lucide-x" color="primary" @click="closeModal"></UButton>
      </div>
      <div class="max-w-xl mx-auto flex flex-col h-[80vh] border rounded-2xl shadow-sm bg-white">
        <div class="flex-1 overflow-y-auto p-4">
          <UChatMessages :messages="messages" />
        </div>

        <div class="p-3 border-t flex gap-2 items-center">
          <UInput v-model="input" placeholder="Type your message..." class="flex-1" @keyup.enter="sendMessage" />
          <UButton color="primary" @click="sendMessage">Send</UButton>
          <UButton icon="i-lucide-arrow-up-from-line" color="primary" @click="sendMessage"></UButton>
        </div>
      </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import type { UIMessage } from 'ai'
import { ref } from 'vue'

// état de la modale
const showModal = ref(false)
const selectedAvatar = ref('')

const openModal = (avatarName:string) => {
  selectedAvatar.value = avatarName
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}


const messages = ref<UIMessage[]>([
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text: "Salut ...  I am your virtual assistant."}]
  }
])

const input = ref('')

function sendMessage() {
  if (!input.value.trim()) return

  messages.value.push({
    id: crypto.randomUUID(),
    role: 'user',
    parts: [{ type: 'text', text: input.value }]
  })

  input.value = ''
}

</script>
