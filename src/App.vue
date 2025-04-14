<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 font-sans animate-fadeIn">
    <!-- 顶部导航栏 -->
    <header class="sticky top-0 z-50 transition-all duration-300"
            :class="{'backdrop-blur-md bg-white/30': isScrolled, 'bg-transparent': !isScrolled}">
      <div class="container mx-auto px-[5%] py-3 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <img src="@/assets/logo.png" alt="Doro Logo" class="w-12 h-12  object-cover mr-3">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent gradient-animate">
            Doro结局</h1>
        </div>

        <!-- 搜索框和 GitHub 链接 -->
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
                type="text"
                placeholder="搜索文案和评价..."
                class="pl-10 pr-4 py-2 rounded-full border-none bg-white/80 hover:bg-white/90 focus:bg-white focus:ring-2 focus:ring-purple-300 outline-none transition-all text-sm w-40 md:w-64"
            >
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <a href="https://github.com/doro-world/doro-world" target="_blank"
             class="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors duration-200 !rounded-button whitespace-nowrap">
            <i class="fab fa-github"></i>
            <span class="hidden md:inline">Star on GitHub</span>
          </a>
        </div>
      </div>
    </header>
    <!-- Hero 区域 -->
    <hero/>
    <!-- 内容分类导航 -->
    <section class="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
      <div class="container mx-auto px-[8%]">
        <h2 class="text-2xl font-bold text-center mb-8 text-purple-800">探索 Doro 的结局</h2>
        <div class="flex justify-center space-x-4 mb-8">
          <button style="cursor: pointer" :class="['px-6 py-2 rounded-full font-medium transition-all duration-200 !rounded-button whitespace-nowrap',
          activeCategory === 'rand'? 'bg-purple-600 text-white shadow-lg': 'bg-white text-gray-700 hover:bg-purple-50']"
                  @click="activeCategory = 'rand'">
            随机结局
          </button>
          <button style="cursor: pointer" :class="['px-6 py-2 rounded-full font-medium transition-all duration-200 !rounded-button whitespace-nowrap',
          activeCategory === 'happy'? 'bg-purple-600 text-white shadow-lg': 'bg-white text-gray-700 hover:bg-purple-50']"
                  @click="activeCategory = 'happy'">
            好结局
          </button>
          <button style="cursor: pointer" :class="['px-6 py-2 rounded-full font-medium transition-all duration-200 !rounded-button whitespace-nowrap',
          activeCategory === 'bad'? 'bg-purple-600 text-white shadow-lg': 'bg-white text-gray-700 hover:bg-purple-50']"
                  @click="activeCategory = 'bad'">
            坏结局
          </button>
        </div>
        <div class="md:pr-8">
          <!-- 内容卡片 -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slideInFromBottom">
            <div v-for="(post, index) in postList" :key="index"
                 class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
              <div class="h-60 overflow-hidden">
                <img :src="post.img" :alt="post.title"
                     class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300">
              </div>
              <div class="p-5">
                <div class="flex items-center mb-3">
                  <span class="text-gray-400 text-xs ml-3">{{ post.date }}</span>
                </div>
                <h3 class="text-xl font-bold mb-2 text-gray-800">{{ post.title }}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">{{ post.content }}</p>
                <button
                    class="text-purple-500 hover:text-purple-700 font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                  完整阅读 <i class="fas fa-arrow-right ml-1 text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <top/>
    <!-- 页脚 -->
    <Footer/>
  </div>
</template>
<script setup>
import {ref, computed, onMounted, onUnmounted, nextTick} from 'vue';

import Hero from "@/components/hero.vue";
import Top from "@/components/top.vue";
import Footer from "@/components/footer.vue";
// 控制顶部导航栏透明度
const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});


// 当前活跃分类
const activeCategory = ref('rand');
// 存储所有加载的数据
const allPosts = ref({
  happy: [],
  bad: []
});
// 获取当前的数据
const postList = computed(() => {
  if (activeCategory.value === 'rand') {
    return [...allPosts.value.happy, ...allPosts.value.bad].sort(() => Math.random() - 0.5);
  }
  if (activeCategory.value === 'happy') {
    return allPosts.value.happy;
  }
  if (activeCategory.value === 'bad') {
    return allPosts.value.bad;
  }
});

const loadJsonFiles = async () => {
  try {
    // 加载好结局JSON文件
    const goodModule = import.meta.glob('/doro/happy/*.json');
    for (const path in goodModule) {
      const module = await goodModule[path]();
      const fileName = path.split('/').pop().replace('.json', '');
      allPosts.value.happy.push({
        ...module.default, title: fileName
      });
    }

    // 加载坏结局JSON文件
    const badModule = import.meta.glob('/doro/bad/*.json');
    for (const path in badModule) {
      const module = await badModule[path]();
      const fileName = path.split('/').pop().replace('.json', '');
      allPosts.value.bad.push({
        ...module.default, title: fileName
      });
    }
  } catch (error) {
    console.error('加载JSON文件失败:', error);
  }
};

// 添加滚动动画
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
// 监听滚动以添加动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slideInFromBottom');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
// 为所有主要内容块添加观察
  document.querySelectorAll('.bg-white').forEach(el => {
    observer.observe(el);
  });
  loadJsonFiles()
});
</script>
