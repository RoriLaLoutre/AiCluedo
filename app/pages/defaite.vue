<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center text-white relative bg-cover bg-center"
    style="background-image:
        linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),
        url('../parc.png');"
    >
    <h1 class="text-2xl font-bold mb-12 text-center drop-shadow-lg">
      Défaite
    </h1>

    <div class="flex flex-col items-center">
      <img
        :src="selectedImage"
        :alt="selectedName"
        class="w-40 h-40 rounded-full border-4 border-white object-cover mb-4"
      />
      <p class="text-lg font-semibold">{{ selectedName }}</p>
    </div>

    <p class="mt-8 text-lg text-center">
      Ce n'était pas le bon choix...
    </p>

    <button
      @click="$router.push('/')"
      class="mt-10 bg-[#B85EFF] text-white px-6 py-2 rounded hover:bg-[#a34ef0] transition"
    >
      Rejouer
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedName = route.query.name as string || 'Inconnu'
const selectedImage = route.query.image as string || '/placeholder.png'
</script>
