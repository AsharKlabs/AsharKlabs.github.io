<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="relative min-h-screen bg-slate-950">
    <div class="bg-grid bg-grid-fade pointer-events-none fixed inset-0 -z-10" />
    <NavBar />
    <RouterView />
    <FooterSection />
  </div>
</template>
