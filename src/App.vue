<script setup lang="ts">
import DataComponent from './components/admin/DataComponent.vue';
import MobileAppbar from './components/application/MobileAppbar.vue';
import DesktopAppbar from './components/application/DesktopAppbar.vue';
import { isMobile } from './helpers/EnviorementHelper'
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import useFamilyStore from './stores/family'
import LocalStorageKey from './models/componentModels/LocalStorageKey';
import { getCurrentUser } from 'vuefire';
import routes, { type RouteDetails } from './models/componentModels/Routes';
import { ref } from 'vue';

const isMobileDevice = isMobile()
const router = useRouter()
const familyStore = useFamilyStore()
const navigationRoutes = ref<Array<RouteDetails>>(routes.getNonHiddenRouteDetails())

watch(router.currentRoute, async (newValue) => {
  const familyIdFromRouteParams = newValue.params.familyId
  const familyIdFromLocalStorage = localStorage.getItem(LocalStorageKey.FamilyId)

  if (familyIdFromLocalStorage) {
    familyStore.setFamilyId(familyIdFromLocalStorage)
  }
  else if (familyIdFromRouteParams) {
    familyStore.setFamilyId(Array.isArray(familyIdFromRouteParams) ? familyIdFromRouteParams[0] : familyIdFromRouteParams)
  }

  const isAdminUser: boolean = !!await getCurrentUser()
  navigationRoutes.value = routes.getNonHiddenRouteDetails(isAdminUser)
})
</script>

<template>
  <v-app>
    <DataComponent />
    <v-main>
      <MobileAppbar v-if="isMobileDevice" />
      <DesktopAppbar :navigation-routes="navigationRoutes"
                     v-else />
      <router-view />
    </v-main>
  </v-app>
</template>
