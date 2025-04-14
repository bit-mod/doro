<script setup>
// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<template>
  <button
      class="fixed bottom-8 right-8 bg-purple-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200 cursor-pointer !rounded-button"
      @click="scrollToTop"
  >
    <svg t="1744549653970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="1475" width="32" height="32">
      <path
          d="M576 452.266667v422.4h-85.333333v-422.4l-89.6 89.6L341.333333 477.866667l192-192 192 192-59.733333 59.733333-89.6-85.333333z m213.333333-217.6h-512v-85.333334h512v85.333334z"
          fill="#ffffff" p-id="1476"></path>
    </svg>
  </button>
</template>

<style scoped>

</style>