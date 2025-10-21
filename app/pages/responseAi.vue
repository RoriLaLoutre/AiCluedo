<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSendMessageToAi } from '~/composables/sendMessageToAi'
import { ahu } from "~/composables/witness";

const réponse = ref<any>(null)
const erreur = ref<string | null>(null)

onMounted(async () => {
  try {
    // Appel à ton API composable
    réponse.value = await useSendMessageToAi(ahu)
    console.log("Réponse API :", JSON.stringify(réponse.value, null, 2))
  } catch (e: any) {
    erreur.value = e.message
    console.error("Erreur API :", e)
  }
})
</script>

<template>
  <div>
    <h1>Réponse de l'API :</h1>
    <pre>{{ JSON.stringify(réponse, null, 2) }}</pre>
    <p v-if="erreur" class="text-red-500">Erreur: {{ erreur }}</p>
  </div>
</template>