<template>
  <section class="relative overflow-hidden -mt-[72px] pt-[72px]">
    <div class="container mx-auto  px-[8%] py-20 flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 z-10 animate-slideInFromLeft">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-purple-800">欢迎来到 Doro 的结局</h2>
        <p class="text-lg text-gray-700 mb-8">Doro可以是Doro，也可以是你身边任何关心你的人！</p>
        <button
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
          吃个哦润几
        </button>
      </div>
      <div class="md:w-1/2 mt-8 md:mt-0 flex justify-center animate-slideInFromRight">
        <img src="@/assets/hero.gif" alt="Doro Q版形象" style="width: 300px"
             class=" z-10 hover:scale-105 transition-transform duration-300 rounded-lg  white-bg-transparent">
      </div>
    </div>
    <div
        class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-pink-50/80 to-purple-100/80 backdrop-blur-sm">
      <img src="@/assets/bg.jpg" alt="背景" class="w-full h-full object-cover opacity-25">
    </div>
  </section>
</template>

<style scoped>
.white-bg-transparent {
  filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0)) brightness(1.05) contrast(1.05);
  mix-blend-mode: multiply;
  background: transparent;
}
</style>