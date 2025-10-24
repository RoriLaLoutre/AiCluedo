<template>
  <div class="p-20 bg-[url(/amongThem.png)] bg-cover min-h-screen flex flex-col items-center">
    <img 
      src="/mathis.png" alt="Mathis" 
      class="w-30 h-30 absolute top-[65%] left-[11%] border-transparent object-cover object-top hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer animate-fade-in"
      @click="openModal('avatar', 'Mathis')"
      />
    <img
        src="/laeti.png" alt="Laetitia"
        class="w-30 h-30 absolute top-[62%] left-[61%] border-transparent object-cover object-top hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer animate-fade-in"
        @click="openModal('avatar', 'Laetitia')"
    />
    <img 
      src="/ahu.png" alt="Ahu" 
      class="w-30 h-30 absolute top-[62%] left-[80%] border-transparent object-cover object-top hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer animate-fade-in"
      @click="openModal('avatar', 'Ahu')"
      />
    <img 
      src="/esteban.png" alt="Esteban" 
      class="w-30 h-30 absolute top-[79%] left-[44%] border-transparent object-cover object-top hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer animate-fade-in"
      @click="openModal('avatar', 'Esteban')"
      />
    <img
        src="/robin.png" alt="Robin"
        class="w-30 h-30 absolute top-[53%] left-[53%] border-transparent object-cover object-top hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer animate-fade-in"
        @click="openModal('avatar', 'Robin')"
    />
    <img
        src="/geoffroy.png" alt="Geoffroy"
        class="w-30 h-30 absolute top-[27%] left-[40%] border-transparent object-cover object-top hover:border-brand-purple border-8 transition duration-300 rounded-full cursor-pointer animate-fade-in"
        @click="openModal('avatar', 'Geoffroy')"
    />
    <img
      src="/folder.png" alt="folder"   
      class="w-30 h-30 absolute top-[5%] left-[90%] border-transparent border-8 transition duration-300 cursor-pointer animate-bounce"
      @click="openModal('folder')"
    />


    <div class="flex items-center justify-center">
      <button class="bg-brand-navy text-white px-6 py-3 rounded hover:bg-brand-blue animate-fade-in"
      @click="$router.push('/denoncer2')">
      Dénoncer</button>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50" @click.self="closeModal">
    
    <!-- modal AVATAR -->
    <div v-if="modalType === 'avatar'" class="bg-white border rounded-xl p-6 w-[32rem] shadow-lg text-center relative">
      <div class="flex w-full justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-2xl font-bold text-brand-navy">Tu parles à {{ witnessName }}</h2>
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
            autofocus
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
      class="relative bg-[#323232] p-4 rounded-xl shadow-lg w-[1000px] h-[650px]"
    >
      <UButton
        icon="i-lucide-x"
        variant="ghost"
        class="absolute top-[4%] right-[3%] z-10 text-white text-2xl md:text-2xl lg:text-2xl cursor-pointer hover:bg-white/10"
        @click="closeModal"
      /> 
      <img
        src="/group3.png"
        alt="Dossier d'enquête"
        class="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      />
      <div class="absolute top-[16%] left-[17%] w-[30%] h-[70%] overflow-y-auto">
        <p class="w-full h-full bg-transparent text-black resize-none outline-none p-2 text-sm">
            Le vaisseau Horizon IX, en mission scientifique dans la nébuleuse d’<span class="font-bold">Ashra</span>, dérive depuis 327 jours dans l’espace. <br>
            <span class="font-bold text-red-400">Ricardo</span>, le technicien en chef, est retrouvé électrocuté par la machine à café. <br><br>

            Le sabotage de la machine a déclenché une surcharge électrique dans le réseau du vaisseau vous avez 10min pour trouver le coupable puis réparer le système électrique. <br><br>

            Le capitaine <span class="font-bold">Geoffroy</span> ordonne un confinement complet. <br>
            Le joueur, officier de sécurité intérimaire, doit mener une enquête interne pour trouver le coupable et la boite à outil de <span class="font-bold text-red-400">Ricardo</span> avant que la tension (et le réacteur à fusion) ne monte trop.
        </p>
      </div>
      <div class="absolute bottom-[17%] right-[16%] w-[30%] h-[19%]">
        <textarea
          v-model="folderText"
          class="w-full h-full bg-transparent text-black resize-none outline-none p-2"
          placeholder="Note tes soupçons, tes indices, ou tes observations ici..."
        ></textarea>
      </div>
      <div class="absolute top-[15%] right-[20%] w-[25%] h-[44%] overflow-y-auto">
        <p class="w-full h-full bg-transparent text-black resize-none outline-none p-2 text-sm">
          <span class="font-bold text-yellow-400">Indice :</span><br><br>
          Le capitaine <span class="font-bold">Geoffroy</span> t’attend dans la salle de commande. Il paraît nerveux et donne des ordres à tout le monde depuis l’incident.
          Certains disent qu’il s’est disputé avec <span class="font-bold text-red-400">Ricardo</span> la veille de sa mort.
          Peut-être que commencer par lui t’aiderait à comprendre ce qui s’est vraiment passé.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UIMessage } from 'ai'
import { mathis , ahu, esteban, robin, geoffroy, laetitia } from "../composables/witness";

const witnesses = {
  mathis: { data: mathis, name: 'Mathis' , messages:[{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Salut, j'espère que tu as mangé parce que j'ai faim!" }]
      }
  ]},
  ahu: { data: ahu, name: 'Ahu',messages: [{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Salut, je peux répondre à vos questions ?" }]
      }
    ]},
  esteban: { data: esteban, name: 'Esteban' , messages:[{
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: "Salut... Tu as des questions pour moi ?" }]
      }
    ]},
  robin: { data: robin, name: 'Robin' , messages: [{
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: "Salut à toi, jeune enquêteur !" }]
    }
    ]},
  geoffroy: { data: geoffroy, name: 'Geoffroy' , messages: [{
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: "Dépêche-toi de me poser tes questions, j'ai pas que ça à faire !" }]
    }
    ]},
  laetitia: { data: laetitia, name: 'Laetitia' , messages: [{
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: "Bonjour, comment puis-je vous aider ?" }]
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
onMounted(() => {
    openModal('folder')
});

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
  border-radius: 1rem;
}
</style>