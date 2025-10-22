<template>
  <main
      class="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#08145a] via-[#0c1d91] to-[#1a097d] text-white font-[Poppins] overflow-hidden"
  >
    <!-- Halo doux autour du logo -->
    <div class="absolute w-[700px] h-[700px] rounded-full bg-[#64ddff1a] blur-3xl"></div>

    <!-- Contenu principal -->
    <div class="relative z-10 flex flex-col items-center justify-between h-[90%] w-full max-w-[1200px] text-center px-6">

      <!-- Haut : logo + texte -->
      <div class="flex flex-col items-center gap-4">
        <img
            src="/images/En_quete_de_verite_logo.png"
            alt="Logo En Quête de Vérité"
            class="w-[380px] max-w-[80%] drop-shadow-[0_0_30px_#64ddff70]"
        />

        <p class="text-base md:text-lg text-[#cfeaff] max-w-[600px]">
          Deviens enquêteur et perce les mystères de la vérité.<br />
          Choisis ton enquête et découvre qui ment... ou non.
        </p>
      </div>

      <!-- Milieu : cartes -->
      <div class="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mt-2">
        <!-- Enquête 1 -->
        <div
            class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-[250px] shadow-[0_0_25px_rgba(100,221,255,0.2)] hover:shadow-[0_0_35px_rgba(100,221,255,0.4)] transition-all"
        >
          <h3 class="text-[#64ddff] text-base font-semibold mb-2">
            Sieste Criminelle
          </h3>
          <p class="text-sm text-[#e8efff] leading-relaxed mb-4">
            Une après-midi tranquille... jusqu’à la disparition d’une boîte à billes !
          </p>
          <button
              class="bg-[#64ddff] text-[#07155c] font-semibold rounded-full px-4 py-1.5 w-full text-sm transition hover:scale-105 hover:shadow-[0_0_15px_#64ddff]"
          >
            Commencer
          </button>
        </div>

        <!-- Enquête 2 -->
        <div
            class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-[250px] opacity-70"
        >
          <h3 class="text-[#bcdcff] text-base font-semibold mb-2">
            Enquête à venir
          </h3>
          <p class="text-sm text-[#e8efff]/70 leading-relaxed mb-4">
            Une nouvelle affaire sera bientôt disponible...
          </p>
          <button
              disabled
              class="bg-[#3a6b94] text-[#d9eaff] font-semibold rounded-full px-4 py-1.5 w-full text-sm cursor-not-allowed"
          >
            Bientôt
          </button>
        </div>
      </div>

      <!-- Bas : bouton principal -->
      <div class="flex flex-col items-center">

      </div>
    </div>

    <!-- Ligne décorative bas -->
    <div class="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-[#64ddff] via-[#b874ff] to-[#64ddff]"></div>
  </main>
</template>
