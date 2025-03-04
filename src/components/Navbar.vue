<script setup>
import { ref, onMounted } from "vue";

const navigation = ref([
  { name: 'About', href: '/' },
  { name: 'Europe', href: '/europe' },
  { name: 'Asia', href: '/asia' },
  { name: 'Africa', href: '/africa' },
  { name: 'North America', href: '/north-america' },
  { name: 'South America', href: '/south-america' },
  { name: 'Oceania', href: '/oceania' },
  { name: 'World', href: '/world' },
]);
const isLight = ref(localStorage.getItem('theme') !== 'dark');

const applyTheme = () => {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(isLight.value ? "light":"dark")
}

const toggleTheme = () => {
  isLight.value = !isLight.value;
  applyTheme();
  localStorage.setItem('theme', isLight.value ? 'light' : 'dark')
}
const isOpen = ref(false);
onMounted(()=>{
  const selectedTheme = localStorage.getItem('theme');
  if (selectedTheme)
    isLight.value = selectedTheme == 'light';
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    isLight.value = false
  applyTheme()
})
</script>
<template>
    <header>
        <nav>
            <div class="hidden md:flex justify-center items-center text-center bg-(--nav-bg) text-(--main-text) gap-3 lg:gap-10">
                <RouterLink v-for="route in navigation"
                :key="route.name"
                :to="route.href"
                class="font-medium p-[10px] border-b-3 border-transparent hover:bg-(--nav-hover) capitalize"
                activeClass="border-b-(--nav-active) transition duration-300 ease-in-out"
                >{{ route.name }}</RouterLink>
                <button @click="toggleTheme" class="cursor-pointer"><i class="fa fa-sun-o"></i></button>
            </div>
            <!-- Mobile Menu Button -->
    <div class="md:hidden flex justify-end items-center bg-(--nav-bg) text-(--main-text) relative">
      <button @click="toggleTheme" class="mr-3 cursor-pointer"><i class="fa fa-sun-o"></i></button>
      <button @click="isOpen = !isOpen" class="p-2">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
    </div>

    <!-- Dropdown -->
    <div v-show="isOpen" class="md:hidden flex flex-col right-10 bg-(--nav-bg) text-(--main-text) w-40 absolute z-13">
      <RouterLink
        v-for="route in navigation"
        :key="route.name"
        :to="route.href"
        class="font-medium p-[10px] capitalize border-b-1 border-b-(--drp-b) last:border-0 hover:bg-(--nav-hover)"
        active-class="bg-(--nav-active)"
        @click="isOpen=false"
      >
        {{ route.name }}
      </RouterLink>
    </div>
        </nav>
    </header>
</template>