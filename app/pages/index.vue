<template>
  <main
      class="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#08145a] via-[#0c1d91] to-[#1a097d] text-white font-[Poppins] overflow-hidden"
  >
    <div class="absolute w-[700px] h-[700px] rounded-full bg-[#64ddff1a] blur-3xl"></div>
    <div class="relative z-10 flex flex-col items-center justify-between h-[90%] w-full max-w-[1200px] text-center px-6">

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
      <div class="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mt-2">

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
              @click="$router.push('/parc')"

          >
            Commencer
          </button>
        </div>
         <div
            class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-[250px] shadow-[0_0_25px_rgba(100,221,255,0.2)] hover:shadow-[0_0_35px_rgba(100,221,255,0.4)] transition-all"
        >
          <h3 class="text-[#64ddff] text-base font-semibold mb-2">
            AmongThem
          </h3>
          <p class="text-sm text-[#e8efff] leading-relaxed mb-4">
              Même à des années lumières, les imposteurs sont là !          
            </p>
          <button
              class="bg-[#64ddff] text-[#07155c] font-semibold rounded-full px-4 py-1.5 w-full text-sm transition hover:scale-105 hover:shadow-[0_0_15px_#64ddff]"
              @click="$router.push('/amongThem')"
          >
            Commencer
          </button>
        </div>
      </div>

    </div>
    <div class="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-[#64ddff] via-[#b874ff] to-[#64ddff]"></div>
  </main>
</template>
