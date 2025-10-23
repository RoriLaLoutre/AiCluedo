<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center text-white relative bg-cover bg-center"
    style="background-image: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('../parc.png');"
  >
    <button
      @click="$router.back()"
      class="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-100 transition"
    >
      ← Retour
    </button>

    <h1 class="text-2xl mb-12 text-center drop-shadow-lg font-black" style="-webkit-text-stroke: 1px black;">
      Choisir la personne coupable
    </h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-12">
      <div
        v-for="suspect in suspects"
        :key="suspect.id"
        @click="selectSuspect(suspect)"
        data-avatar
        class="flex flex-col items-center cursor-pointer transition-transform hover:scale-105 fade-in"
        :class="{
          grayscale: selectedSuspect && selectedSuspect.id !== suspect.id
        }"
      >
        <div
          :class="[
            'w-32 h-32 rounded-full border-4 flex items-center justify-center overflow-hidden transition-all duration-300',
            selectedSuspect?.id === suspect.id
              ? 'border-red-500 scale-110'
              : 'border-transparent'
          ]"
        >
          <img
            :src="suspect.image"
            :alt="suspect.name"
            class="w-full h-full object-cover transition-all duration-300"
          />
        </div>
<p class="mt-3 text-lg font-black" style="-webkit-text-stroke: 1px black;">
  {{ suspect.name }}
</p>      </div>
    </div>

    <!-- bouton valider -->
    <div class="mt-12">
      <button
        @click="confirmAccusation"
        class="bg-[#B85EFF] text-white px-8 py-3 rounded hover:bg-[#a34ef0] transition animate-fade-in"

        :disabled="!selectedSuspect"
      >
        Valider l'accusation
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const suspects = [
  { id: 1, name: 'Sophie', image: '/woman.png' },
  { id: 2, name: 'Leo', image: '/man1.png' },
  { id: 3, name: 'Capucine', image: '/woman2.png' },
  { id: 4, name: 'Mateo', image: '/man2.png' },
]
const selectedSuspect = ref<any>(null)
const culpritId = 2
const router = useRouter()


function selectSuspect(suspect: any) {
  selectedSuspect.value = suspect
}

function confirmAccusation() {
  if (!selectedSuspect.value) return
  const { id, name, image } = selectedSuspect.value

  if (id === culpritId) {
    router.push({ path: '/victoire', query: { name, image } })
  } else {
    router.push({ path: '/defaite', query: { name, image } })
  }
}
</script>

<style scoped>

.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

[data-avatar]:nth-child(1) { animation-delay: 0s; }
[data-avatar]:nth-child(2) { animation-delay: 0.1s; }
[data-avatar]:nth-child(3) { animation-delay: 0.2s; }
[data-avatar]:nth-child(4) { animation-delay: 0.3s; }

button:disabled {
  cursor: not-allowed;
}
</style>
