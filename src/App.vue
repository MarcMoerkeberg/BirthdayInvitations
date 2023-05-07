<script setup lang="ts">
import DataComponent from './components/admin/DataComponent.vue';
import MobileAppbar from './components/application/MobileAppbar.vue';
import DesktopAppbar from './components/application/DesktopAppbar.vue';
import { isMobile } from './helpers/EnviorementHelper'
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import useFamilyStore from './stores/family'
import LocalStorageKey from './models/componentModels/LocalStorageKey';

const isMobileDevice = isMobile()
const router = useRouter()
const familyStore = useFamilyStore()

watch(router.currentRoute, async (newValue) => {
  const familyIdFromRouteParams = newValue.params.familyId
  const familyIdFromLocalStorage = localStorage.getItem(LocalStorageKey.FamilyId)

  if (familyIdFromLocalStorage) {
    familyStore.setFamilyId(familyIdFromLocalStorage)
  }
  else if (familyIdFromRouteParams) {
    familyStore.setFamilyId(Array.isArray(familyIdFromRouteParams) ? familyIdFromRouteParams[0] : familyIdFromRouteParams)
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
