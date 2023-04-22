<script setup lang="ts">
import DataComponent from './components/DataComponent.vue';
</script>

<template>
  <v-app>
    <DataComponent />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
