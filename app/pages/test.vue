<template>
  <div class="p-20">
    <div class="flex justify-between gap-4 mb-4">
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('avatar','avatar 1')">avatar 1</p>
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('avatar','avatar 2')">avatar 2</p>
    </div>
    <div class="flex justify-between gap-4 mb-4">
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('avatar','avatar 3')">avatar 3</p>
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('avatar','avatar 4')">avatar 4</p>
    </div>
    <div class="flex justify-center gap-4 mb-10">
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('folder')">Fichier d'enquéte</p>
    </div>

    <div class="flex items-center justify-center">
      <button class="bg-brand-navy text-white px-6 py-3 rounded hover:bg-brand-blue">Start</button>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50" @click.self="closeModal">
    
    <!-- Modal AVATAR -->
    <div v-if="modalType === 'avatar'" class="bg-white border rounded-xl p-6 w-[32rem] shadow-lg text-center relative">
      <div class="flex w-full justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-2xl font-bold text-brand-navy">Chat with {{ selectedAvatar }}</h2>
        <UButton icon="i-lucide-x" variant="ghost" color="primary" @click="closeModal" />
      </div>

      <div class="max-w-xl mx-auto flex flex-col h-[70vh] rounded-2xl overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4">
          <UChatMessages
            :messages="messages"
            :assistant="{ variant: 'solid' }"
            :user="{ variant: 'solid', side: 'right' }"
          />
        </div>

        <div class="p-3 border-t flex gap-2 items-center">
          <UInput
            v-model="input"
            placeholder="Type your message..."
            class="flex-1"
            @keyup.enter="sendMessage"
          />
          <UButton color="primary" @click="sendMessage">Send</UButton>
          <UButton icon="i-lucide-arrow-up-from-line" color="primary" @click="sendMessage" />
        </div>
      </div>
    </div>

    <!-- Modal FOLDER -->
    <div
      v-if="modalType === 'folder'"
      class="relative bg-[#1f1f1f] p-4 rounded-xl shadow-lg w-[1000px] h-[650px]"
    >
      <UButton
        icon="i-lucide-x"
        variant="ghost"
        class="absolute top-[5%] right-[0%] z-10 text-white text-2xl md:text-2xl lg:text-2xl cursor-pointer hover:bg-white/10"
        @click="closeModal"
      /> 
      <img
        src="/Group 3.png"
        alt="Dossier d'enquête"
        class="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      />
      <div class="absolute top-[15%] left-[20%] w-[25%] h-[40%] overflow-y-auto">
        <p class="w-full h-full bg-transparent text-black resize-none outline-none p-2">
          C’est une belle après-midi d’été au parc.
          Tout le monde fait la sieste après avoir bien joué…
          Mais quand Capucine se réveille, sa boîte à billes bleue a disparu !
          Quelqu’un l’a sûrement prise pendant que tout le monde dormait.
          <br><br>
          À toi de mener l’enquête : interroge les enfants, écoute leurs souvenirs, et découvre qui a volé les billes de Capucine !
        </p>
      </div>
      <div class="absolute bottom-[17%] left-[17%] w-[30%] h-[19%] overflow-y-auto">
        <p class="w-full h-full bg-transparent text-black resize-none outline-none p-2">
          Indice:
          <br>
          D’après les premiers témoignages, quelqu’un aurait aperçu une silhouette
          bouger près du bac à sable pendant la sieste.
          <br>
          Il paraît que <span class="font-bold">Sophie</span> n’a pas dormi et dessinait pendant ce temps-là.  
          Elle a peut-être remarqué quelque chose d’important.
        </p>
      </div>
      <div class="absolute top-[15%] right-[20%] w-[25%] h-[70%]">
        <textarea
          v-model="folderText"
          class="w-full h-full bg-transparent text-black resize-none outline-none p-2"
          placeholder="Entrez vos notes"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UIMessage } from 'ai'

const showModal = ref(false)
const modalType = ref<'avatar' | 'folder' | null>(null)
const selectedAvatar = ref('')
const folderText = ref('')

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
    parts: [{ type: 'text', text: "Salut ! Comment puis-je t’aider aujourd’hui ?" }]
  }
])

const input = ref('')

function sendMessage() {
  if (!input.value.trim()) return

  const userMessage: UIMessage = {
    id: crypto.randomUUID(),
    role: 'user',
    parts: [{ type: 'text', text: input.value.toString() }]
  }

  messages.value.push(userMessage)

  const messageContent = input.value
  input.value = ''

  setTimeout(() => {
    const assistantMessage: UIMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: `Vous avez dit : "${messageContent}"` }]
    }
    messages.value.push(assistantMessage)
  }, 500)
}
</script>

<style scoped>
::v-deep(article[data-role="user"] > div) {
  justify-content: flex-end;
  text-align: right;  
}
::v-deep(article[data-role="user"] > div > div) {
  background-color: #2563eb; 
  padding-left: 15px;
  padding-right: 15px;
  color: white; 
}
::v-deep(article[data-role="assistant"] > div) {
  justify-content: flex-start;
  text-align: left;  
}
::v-deep(article[data-role="assistant"] > div > div) {
  background-color: #121B7A; 
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white; 
}
</style>
