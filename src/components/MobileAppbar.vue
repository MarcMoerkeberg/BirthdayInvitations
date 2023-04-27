<script setup lang="ts">
import { computed, ref } from 'vue';
import MobileMenuDialog from './MobileMenuDialog.vue';
import { useRouter } from 'vue-router';
import routes, { type RouteDetails } from '@/models/componentModels/Routes';
import type { ComputedRef } from 'vue';

const showDialog = ref<boolean>(false);
const router = useRouter()
const currentRouteIsLandingPage: ComputedRef<boolean> = computed(() => { return router.currentRoute.value.path == routes.LandingPage.Route })
const currentRouteTitle: ComputedRef<string> = computed(() => {
    const routeDetails = routes.getNonHiddenRouteDetails()
    const currentRouteDetails: RouteDetails | undefined = routeDetails.find(details => details.Route === router.currentRoute.value.path)
    return currentRouteDetails?.Title ?? ''
})
</script>

<template>
    <div
         :class="[currentRouteIsLandingPage && !showDialog ? 'justify-end' : 'justify-space-between', { 'bg-color-vuetifybackground': showDialog }, 'overlap-banner', 'mobile-toolbar']">
        <v-card-title v-show="!showDialog && !currentRouteIsLandingPage">{{ currentRouteTitle }}</v-card-title>
        <v-card-title v-show="showDialog">Marcs 30 års fødselsdag</v-card-title>
        <v-btn density="default"
               :icon="showDialog ? 'mdi-close' : 'mdi-menu'"
               variant="text"
               class="bg-color-transparent"
               size="x-large"
               @click="showDialog = !showDialog" />
    </div>
    <div class="menu-dialog-container">
        <MobileMenuDialog :show-dialog="showDialog"
                          @close-dialog="showDialog = false" />
    </div>
</template>

<style scoped>
.menu-dialog-container {
    height: calc(100vh - 64px);
    width: 100vw;
    margin-top: 64px;
    position: absolute;
}
</style>
