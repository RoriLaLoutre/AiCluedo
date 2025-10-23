<template>
  <div
  class="min-h-screen flex flex-col items-center justify-center text-white relative bg-cover bg-center"
  style="background-image:
         linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),
         url('../parc.png');"
    >

    <h1 class="text-3xl font-bold mb-8">FÉLICITATION</h1>

    <div class="w-40 h-40 rounded-full border-4 border-yellow-400 overflow-hidden mb-4">
      <img src="/man1.png" alt="Avatar 2" class="w-full h-full object-cover" />
    </div>

    <p class="text-xl font-semibold mb-2">Avatar 2</p>
    <p class="text-lg">VOUS AVEZ GAGNÉ !!</p>
    <p class="text-lg mb-12">LE COUPABLE ÉTAIT AVATAR 2 !</p>

    <button
      @click="$router.push('/')"
      class="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
    >
      Rejouer
    </button>
  </div>
</template>
