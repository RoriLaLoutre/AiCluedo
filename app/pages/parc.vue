<template>
  <div class="p-20 bg-[url(../../parc.png)] bg-cover min-h-screen flex flex-col items-center">
    <img 
      src="../../woman.png" alt="Sophie" 
      class="w-30 h-30 absolute top-[45%] left-[25%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer" 
      @click="openModal('avatar', 'Sophie')"    
      />
    <img 
      src="../../man1.png" alt="man" 
      class="w-30 h-30 absolute top-[30%] left-[65%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer" 
      @click="openModal('avatar', 'Leo')"
      />
    <img 
      src="../../man2.png" alt="man" 
      class="w-30 h-30 absolute top-[70%] left-[10%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer" 
      @click="openModal('avatar', 'Mateo')"
      />
    <img
      src="../../woman2.png" alt="woman"   
      class="w-30 h-30 absolute top-[65%] left-[65%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer"
      @click="openModal('avatar', 'Capucine')"
    />
    <img
      src="../../folder.png" alt="folder"   
      class="w-30 h-30 absolute top-[5%] left-[90%] border-transparent hover:border-brand-purple border-8 transition duration-300 cursor-pointer"
      @click="openModal('folder')"
    />


    <div class="flex items-center justify-center">
      <button class="bg-brand-navy text-white px-6 py-3 rounded hover:bg-brand-blue"
      @click="$router.push('/denoncer')">
        Dénoncer
      </button>

    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50" @click.self="closeModal">
    
    <!-- modal AVATAR -->
    <div v-if="modalType === 'avatar'" class="bg-white border rounded-xl p-6 w-[32rem] shadow-lg text-center relative">
      <div class="flex w-full justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-2xl font-bold text-brand-navy">Tu parles {{ witnessName }}</h2>
        <UButton icon="i-lucide-x" variant="ghost" color="primary" @click="closeModal" />
      </div>

      <div class="max-w-xl mx-auto flex flex-col h-[70vh] rounded-2xl overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4">
<UChatMessages
  v-if="selectedAvatar"
  :messages="selectedAvatar.messages"
  :shouldAutoScroll="true"
  :assistant="{ variant: 'solid' }"
  :user="{ variant: 'solid', side: 'right' }"
/>
        </div>

        <div class="p-3 border-t flex gap-2 items-center">
          <UInput
            v-model="input"
            placeholder="Écrivez votre message"
            class="flex-1"
            @keyup.enter="sendMessage(selectedAvatar)"
          />
          <UButton color="primary" @click="sendMessage(selectedAvatar)">Envoyer</UButton>
          <UButton icon="i-lucide-arrow-right" color="primary" @click="sendMessage(selectedAvatar)" />
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
        src="../../group3.png"
        alt="Dossier d'enquête"
        class="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      />
      <div class="absolute top-[15%] left-[20%] w-[25%] h-[40%] overflow-y-auto">
        <p class="w-full h-full bg-transparent text-black resize-none outline-none p-2">
          C'est une belle après-midi d'été au parc.
          Tout le monde fait la sieste après avoir bien joué…
          Mais quand Capucine se réveille, sa boîte à billes bleue a disparu !
          Quelqu'un l'a sûrement prise pendant que tout le monde dormait.
          <br><br>
          À toi de mener l'enquête : interroge les enfants, écoute leurs souvenirs, et découvre qui a volé les billes de Capucine !
        </p>
      </div>
      <div class="absolute bottom-[17%] left-[17%] w-[30%] h-[19%] overflow-y-auto">
        <p class="w-full h-full bg-transparent text-black resize-none outline-none p-2">
          Indice:
          <br>
          D'après les premiers témoignages, quelqu'un aurait aperçu une silhouette
          bouger près du bac à sable pendant la sieste.
          <br>
          Il paraît que <span class="font-bold">Sophie</span> n'a pas dormi et dessinait pendant ce temps-là.  
          Elle a peut-être remarqué quelque chose d'important.
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
import { capucine , leo , sophie, mateo } from "../composables/witness";


const witnesses = {
  mateo: { data: mateo, name: 'Mateo' , messages:[{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Bonjour, c'est vous qui venez me poser des questions?" }]
      }
  ]},
  leo: { data: leo, name: 'Leo',messages: [{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Moi c'est leo, qu'est ce que vous me voulez" }]
      }
    ]},
  capucine: { data: capucine, name: 'Capucine' , messages:[{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "On m'a volé mes billes! retrouvez le voleur pour moi s'il vous plaît" }]
      }
    ]},
  sophie: { data: sophie, name: 'Sophie' , messages: [{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Bonjour, moi c'est Sophie posez moi vos questions" }]
      }
    ]},
} as any

const witnessName = ref('')
const showModal = ref(false)
const modalType = ref<'avatar' | 'folder' | null>(null)
const selectedAvatar = ref<any>(null)
const folderText = ref('')

const openModal = (type: 'avatar' | 'folder', witnessKey?: string) => {
  modalType.value = type
  if (type === 'avatar' && witnessKey) {
    const witness = Object.values(witnesses).find(w => w.name === witnessKey)
    if (witness) {
      selectedAvatar.value = witness
      witnessName.value = witnessKey
    }
  }
  showModal.value = true
}


const closeModal = () => {
  showModal.value = false
  modalType.value = null
  selectedAvatar.value = null
  witnessName.value = ''
}

const messages = ref<UIMessage[]>([
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text: "Salut ! Comment puis-je t'aider aujourd'hui ?" }]
  }
])

const input = ref('')

async function sendMessage(persona: any) {
  if (!input.value.trim() || !persona) return

  const messageContent = input.value
  input.value = ''

  // Ajout du message utilisateur
  persona.messages.push({
    role: 'user',
    content: messageContent
  })
  persona.data.messages.push({
    role: 'user',
    content: messageContent
  })

  const res = await useSendMessageToAi(persona.data) // tu continues à envoyer la data du témoin

  persona.messages.push({
    role: 'assistant',
    content: res
  })
  persona.data.messages.push({
    role: 'assistant',
    content: res
  })


  const assistantMessage: UIMessage = {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text: `${res}` }]
  }
  messages.value.push(assistantMessage)
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
  border-radius: 1rem;

}
::v-deep(article.group\/message) {
  margin-bottom: 0.75rem;
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
  border-radius: 1rem; 

}
</style>