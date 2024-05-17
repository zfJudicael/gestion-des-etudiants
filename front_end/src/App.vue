<template>
  <div class="flex">
    <NavBar class="basis-1/6"/>
    <RouterView class="basis-5/6"/>
  </div>
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ConfirmDialog from 'primevue/confirmdialog'

</script>