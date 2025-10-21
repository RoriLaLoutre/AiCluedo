<template>
  <div class="p-20">
    <div class="flex justify-between gap-4 mb-4">
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('avatar 1')">avatar 1</p>
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('avatar 2')">avatar 2</p>
    </div>
    <div class="flex justify-between gap-4 mb-4">
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('avatar 3')">avatar 3</p>
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('avatar 4')">avatar 4</p>
    </div>
    <div class="flex justify-center gap-4 mb-10">
      <p class="cursor-pointer hover:text-brand-blue text-brand-navy" @click="openModal('Folder')">Folder</p>
    </div>

    <div class="flex items-center justify-center">
      <button class="bg-brand-navy text-white px-6 py-3 rounded hover:bg-brand-blue">Start</button>
    </div>
  </div>

  <!-- Fenêtre modale -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-white border rounded-xl p-6 w-[32rem] shadow-lg text-center relative">
      <div class="flex w-full justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-2xl font-bold text-brand-navy">Chat with {{ selectedAvatar }}</h2>
        <UButton icon="i-lucide-x" variant="ghost" color="primary" @click="closeModal" />
      </div>

      <div class="max-w-xl mx-auto flex flex-col h-[70vh] rounded-2xl bg-brand-navy text-white overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4">
          <UChatMessages
            :messages="messages"
            :assistant="{
            variant: 'solid',
            avatar: { icon: 'i-lucide-bot' },
            }"
            :user="{
                variant: 'solid',
                side: 'right',
            }"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UIMessage } from 'ai'

const showModal = ref(false)
const selectedAvatar = ref('')

const openModal = (avatarName: string) => {
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
