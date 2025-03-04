<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from './components/Footer.vue';
</script>

<template>
 <div class="flex flex-col min-h-screen box-border bg-(--bg)">
  <Navbar/>
  <RouterView />
  <Footer/>
</div>
</template>

