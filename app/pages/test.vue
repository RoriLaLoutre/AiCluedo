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
      <h2 class="text-2xl font-bold mb-4">👤 {{ selectedAvatar }}</h2>
      <p class="text-gray-600 mb-6">Voici les détails de {{ selectedAvatar }}.</p>

      <button
        @click="closeModal"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// état de la modale
const showModal = ref(false)
const selectedAvatar = ref('')

const openModal = (avatarName) => {
  selectedAvatar.value = avatarName
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>
