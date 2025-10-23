<template>
  <div class="p-20 bg-[url(../../amongThem.png)] bg-cover min-h-screen flex flex-col items-center">
    <img 
      src="../../woman.png" alt="woman" 
      class="w-30 h-30 absolute top-[65%] left-[11%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer"
      @click="openModal('avatar', 'ricardo')"
      />
    <img
        src="../../woman2.png" alt="woman"
        class="w-30 h-30 absolute top-[62%] left-[61%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer"
        @click="openModal('avatar', 'laetitia')"
    />
    <img 
      src="../../man1.png" alt="man" 
      class="w-30 h-30 absolute top-[62%] left-[80%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer"
      @click="openModal('avatar', 'ahu')"
      />
    <img 
      src="../../man2.png" alt="man" 
      class="w-30 h-30 absolute top-[79%] left-[44%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer"
      @click="openModal('avatar', 'esteban')"
      />
    <img
        src="../../man3.png" alt="man"
        class="w-30 h-30 absolute top-[53%] left-[53%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer"
        @click="openModal('avatar', 'robin')"
    />
    <img
        src="../../man4.png" alt="man"
        class="w-30 h-30 absolute top-[27%] left-[40%] border-transparent hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer"
        @click="openModal('avatar', 'geoffroy')"
    />
    <img
      src="../../folder.png" alt="folder"   
      class="w-30 h-30 absolute top-[5%] left-[90%] border-transparent hover:border-brand-purple border-8 transition duration-300 cursor-pointer"
      @click="openModal('folder')"
    />


    <div class="flex items-center justify-center">
      <button class="bg-brand-navy text-white px-6 py-3 rounded hover:bg-brand-blue">Dénoncer</button>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50" @click.self="closeModal">
    
    <!-- modal AVATAR -->
    <div v-if="modalType === 'avatar'" class="bg-white border rounded-xl p-6 w-[32rem] shadow-lg text-center relative">
      <div class="flex w-full justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-2xl font-bold text-brand-navy">Chat with {{ witnessName }}</h2>
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
            placeholder="Type your message..."
            class="flex-1"
            @keyup.enter="sendMessage(selectedAvatar)"
          />
          <UButton color="primary" @click="sendMessage(selectedAvatar)">Send</UButton>
          <UButton icon="i-lucide-arrow-up-from-line" color="primary" @click="sendMessage(selectedAvatar)" />
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
            L’alarme d’urgence retentit dans la station spatiale.<br><br>
            Tous les membres d’équipage se réunissent dans la salle de réunion.
            Quelqu’un a découvert le corps de <span class="font-bold text-red-400">Mathis</span> près du réacteur…<br><br>
            Il faut à tout prix trouver le coupable avant qu’il ne frappe à nouveau !
            <br><br>
            <span class="italic">Observe bien les comportements, écoute les témoignages, et déduis qui est l’imposteur…</span>
        </p>
      </div>
      <div class="absolute bottom-[17%] left-[17%] w-[30%] h-[19%] overflow-y-auto">
        <p class="w-full h-full bg-transparent text-black resize-none outline-none p-2">
          <span class="font-bold text-yellow-400">Indice :</span><br><br>
          Plusieurs témoins affirment avoir vu quelqu’un quitter la salle d’électricité peu avant la découverte du corps.<br><br>
          <span class="font-bold">Geoffroy</span> prétend avoir réparé le câblage, mais personne ne peut le confirmer.<br><br>
          <span class="font-bold">Laetitia</span>, elle, dit avoir vu une ombre passer près du réacteur juste avant la coupure de courant...
        </p>
      </div>
      <div class="absolute top-[15%] right-[20%] w-[25%] h-[70%]">
        <textarea
          v-model="folderText"
          class="w-full h-full bg-transparent text-black resize-none outline-none p-2"
          placeholder="Note tes soupçons, tes indices, ou tes observations ici..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UIMessage } from 'ai'
import { mathis , ricardo , ahu, esteban, robin, geoffroy, laetitia } from "../composables/witness";

const witnesses = {
  mathis: { data: mathis, name: 'Mathis' , messages:[{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Ya quoi msieur le policier" }]
      }
  ]},
  ricardo: { data: ricardo, name: 'Ricardo' , messages: [{
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: "ACAB!" }]
    }
    ]},
  ahu: { data: ahu, name: 'Ahu',messages: [{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Hey come here police guy , i'll answer all your questions hiii ha!" }]
      }
    ]},
  esteban: { data: esteban, name: 'Esteban' , messages:[{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Bien le bonjour très cher monsieur n'hésitez pas a me poser des questions" }]
      }
    ]},
  robin: { data: robin, name: 'Robin' , messages: [{
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: "Ouais… j’suis là. Qu’est-ce que vous voulez savoir ?" }]
    }
    ]},
  geoffroy: { data: geoffroy, name: 'Geoffroy' , messages: [{
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: "Ah, un flic ! Faites gaffe, y’a du courant dans l’air héhé." }]
    }
    ]},
  laetitia: { data: laetitia, name: 'Laetitia' , messages: [{
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: "Oh, encore un interrogatoire ? Très bien, j’espère que vous êtes plus poli que le dernier." }]
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
  if (type === 'avatar' && witnessKey && witnesses[witnessKey]) {
    selectedAvatar.value = witnesses[witnessKey] // 👈 on garde tout l’objet
    witnessName.value = witnesses[witnessKey].name
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
}
::v-deep(article.group\/message) {
  margin-bottom: 0.75rem; /* équivaut à gap-3 */
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