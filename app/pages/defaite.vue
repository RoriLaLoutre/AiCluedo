<template>
  <div
  class="min-h-screen flex flex-col items-center justify-center text-white relative bg-cover bg-center"
  style="background-image:
         linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),
         url('../parc.png');"
    >

    <h1 class="text-3xl font-bold mb-8">DOMMAGE</h1>

    <div class="w-40 h-40 rounded-full border-4 border-gray-400 overflow-hidden mb-4">
      <img src="/man2.png" alt="Avatar 4" class="w-full h-full object-cover" />
    </div>

    <p class="text-xl font-semibold mb-2">Avatar 4</p>
    <p class="text-lg font-bold">VOUS AVEZ PERDU...</p>
    <p class="text-lg font-bold mb-12">LE COUPABLE, C'ÉTAIT AVATAR 2 !</p>

    <button
      @click="$router.push('/')"
      class="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
    >
      Réessayer
    </button>
  </div>
</template>
