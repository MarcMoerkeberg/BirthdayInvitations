<script setup lang="ts">
import DataComponent from './components/DataComponent.vue';
import MobileAppbar from './components/MobileAppbar.vue';
import DesktopAppbar from './components/DesktopAppbar.vue';
import { isMobile } from './helpers/EnviorementHelper'

const isMobileDevice = isMobile()
</script>

<template>
  <v-app>
    <DataComponent />
    <v-main>
      <MobileAppbar v-if="true" />
      <DesktopAppbar v-else />
      <router-view />
    </v-main>
  </v-app>
</template>

<!-- <style>
html {
  overflow-y: hidden;
}
</style> -->
