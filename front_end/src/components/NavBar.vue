<template>
  <div class="navbar ">
    <ul class="mt-20 text-center text-lg">
      <RouterLink :to="{name: 'home'}"><li :class="{active: isRouteNameMatched('home')}"><i class="fa-solid fa-house m-4"></i>Home</li></RouterLink>
      <RouterLink :to="{name: 'classe'}"><li :class="{active: isRouteNameMatched('classe')}"><i class="fa-solid fa-users m-4"></i>Classe</li></RouterLink>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute()
const isRouteNameMatched = (name)=>{
  return route.name === name
}
</script>

<style>
@tailwind components;

@layer components{
  .navbar {
    @apply bg-teal-400 h-screen 
  }

  .active {
    @apply bg-teal-600 text-white
  }

  li{
    @apply w-full p-3 hover:bg-teal-500 transition ease-out duration-500
  }
}
</style>