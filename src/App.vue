<script setup lang="ts">
import DataComponent from './components/admin/DataComponent.vue';
import MobileAppbar from './components/application/MobileAppbar.vue';
import DesktopAppbar from './components/application/DesktopAppbar.vue';
import { isMobile } from './helpers/EnviorementHelper'
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import LocalStorageKey from './models/componentModels/LocalStorageKey';
import useGuestStore from './stores/guest';

const isMobileDevice = isMobile()
const router = useRouter()
const guestStore = useGuestStore()

watch(router.currentRoute, async (newValue) => {
  const guestIdFromRouteParams = newValue.params.guestId
  const guestIdFromLocalStorage = localStorage.getItem(LocalStorageKey.GuestId)

  if (guestIdFromRouteParams) {
    guestStore.setGuestId(Array.isArray(guestIdFromRouteParams) ? guestIdFromRouteParams[0] : guestIdFromRouteParams)
  }
  else if (guestIdFromLocalStorage) {
    guestStore.setGuestId(guestIdFromLocalStorage)
  }
})
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
