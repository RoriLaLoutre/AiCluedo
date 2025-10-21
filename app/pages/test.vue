<template>
  <div class="p-20">
    <!-- Grille des avatars -->
    <div class="flex justify-between gap-4 mb-4">
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('avatar','avatar 1')">avatar 1</p>
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('avatar','avatar 2')">avatar 2</p>
    </div>
    <div class="flex justify-between gap-4 mb-4">
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('avatar','avatar 3')">avatar 3</p>
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('avatar','avatar 4')">avatar 4</p>
    </div>
    <div class="flex justify-center gap-4 mb-10">
      <p class="cursor-pointer hover:text-blue-500" @click="openModal('folder')">Fichier d'enquéte</p>
    </div>

    <!-- Bouton start -->
    <div class="flex items-center justify-center">
      <button class="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">Start</button>
    </div>
  </div>

  <!-- Modal globale -->
<div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50" @click.self="closeModal">

  <!-- Modal AVATAR -->
  <div v-if="modalType === 'avatar'" class="bg-white rounded-xl p-8 w-96 shadow-lg text-center relative">
    <div class="flex w-full justify-between">
      <h2 class="text-2xl font-bold mb-4">Chat with {{ selectedAvatar }}</h2>
      <UButton icon="i-lucide-x" @click="closeModal"></UButton>
    </div>

    <div class="flex flex-col h-[80vh] border rounded-2xl shadow-sm">
      <div class="flex-1 overflow-y-auto p-4">
        <UChatMessages :messages="messages" />
      </div>

      <div class="p-3 border-t flex gap-2 items-center">
        <UInput v-model="input" placeholder="Type your message..." class="flex-1" @keyup.enter="sendMessage" />
        <UButton color="primary" @click="sendMessage">Send</UButton>
      </div>
    </div>
  </div>

  <!-- Modal FOLDER -->
  <div
  v-if="modalType === 'folder'"
  class="relative bg-[#1f1f1f] p-4 rounded-xl shadow-lg w-[800px] h-[500px]"
>
  <UButton
    icon="i-lucide-x"
    class="absolute top-4 right-4 z-10"
    @click="closeModal"
  />

  <!-- Image de fond -->
  <img
    src="/Group 3.png"
    alt="Dossier d'enquête"
    class="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
  />

  <!-- Zones de texte positionnées -->
  <div class="absolute top-[15%] left-[20%] w-[25%] h-[40%]">
    <textarea
      v-model="folderText1"
      class="w-full h-full bg-transparent text-black resize-none outline-none p-2"
      placeholder="Zone 1..."
    ></textarea>
  </div>

  <div class="absolute bottom-[17%] left-[17%] w-[30%] h-[19%]">
    <textarea
      v-model="folderText2"
      class="w-full h-full bg-transparent text-black resize-none outline-none p-2"
      placeholder="Zone 2..."
    ></textarea>
  </div>

  <div class="absolute top-[15%] right-[20%] w-[25%] h-[70%]">
    <textarea
      v-model="folderText3"
      class="w-full h-full bg-transparent text-black resize-none outline-none p-2"
      placeholder="Zone 3..."
    ></textarea>
  </div>
</div>

</div>

</template>

<script setup lang="ts">
import type { UIMessage } from 'ai'
import { ref } from 'vue'

// état de la modale
const showModal = ref(false)
const modalType = ref<'avatar' | 'folder' | null>(null)
const selectedAvatar = ref('')
const folderText1 = ref('')
const folderText2 = ref('')
const folderText3 = ref('')



const openModal = (type: 'avatar' | 'folder', payload?: string) => {
  modalType.value = type

  if (type === 'avatar' && payload) {
    selectedAvatar.value = payload
  }

  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  modalType.value = null
  selectedAvatar.value = ''
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
