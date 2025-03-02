<script setup>
import { ref } from "vue";

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
const isOpen = ref(false);

</script>
<template>
    <header>
        <nav>
            <div class="hidden md:flex justify-center items-center text-center bg-amber-100 gap-3 lg:gap-10">
                <RouterLink v-for="route in navigation"
                :key="route.name"
                :to="route.href"
                class="font-medium p-[10px] border-b-3 border-transparent hover:bg-emerald-400 capitalize"
                activeClass="border-b-emerald-500 transition duration-300 ease-in-out"
                >{{ route.name }}</RouterLink>
                
            </div>
            <!-- Mobile Menu Button -->
    <div class="md:hidden flex justify-end items-center bg-amber-100 relative">
      <button @click="isOpen = !isOpen" class="p-2">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
    </div>

    <!-- Dropdown -->
    <div v-show="isOpen" class="md:hidden flex flex-col right-10 bg-amber-100 w-40 absolute z-13">
      <RouterLink
        v-for="route in navigation"
        :key="route.name"
        :to="route.href"
        class="font-medium p-[10px] capitalize border-b-1 border-b-amber-500 last:border-0 hover:bg-green-100"
        active-class="bg-green-100"
        @click="isOpen=false"
      >
        {{ route.name }}
      </RouterLink>
    </div>
        </nav>
    </header>
</template>