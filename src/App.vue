<script setup lang="ts">
import DataComponent from './components/DataComponent.vue';
import MobileAppbar from './components/MobileAppbar.vue';
import DesktopAppbar from './components/DesktopAppbar.vue';
import { isMobile } from './helpers/EnviorementHelper'
import { ref } from 'vue';
import { onMounted } from 'vue';

const isMobileDevice = ref<boolean>(false)
onMounted(() => { isMobileDevice.value = isMobile() }) 
</script>

<template>
  <v-app>
    <DataComponent />
    <v-main>
      <MobileAppbar v-if="isMobileDevice" />
      <DesktopAppbar v-else />
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
