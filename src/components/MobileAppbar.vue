<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue';
import routes from '@/models/componentModels/Routes';
import { useRouter } from 'vue-router';

const router = useRouter()
const showDialog = ref<boolean>(false);
const menuButtons = routes.getNonHiddenRouteDetails()
const makeNavBarTransparent: ComputedRef<boolean> = computed(() => { return !showDialog.value && router.currentRoute.value.path == routes.LandingPage.Route && window.scrollY < 20 })
</script>

<template>
    <v-app-bar :elevation="makeNavBarTransparent ? 0 : 2"
               scroll-behavior="hide"
               scroll-threshold="100"
               color="primary"
               :class="{ 'bg-color-transparent': makeNavBarTransparent }">
        <template v-slot:append>
            <v-app-bar-nav-icon :icon="showDialog ? 'mdi-close' : 'mdi-menu'"
                                @click="showDialog = !showDialog" />
        </template>
    </v-app-bar>

    <v-navigation-drawer v-model="showDialog"
                         location="top"
                         temporary
                         style="height:100vh;">
        <div class="navigation-button-container">
            <img src="../assets/images/crafty-champagne-cork.png"
                 width="64"
                 @click="router.push(routes.LandingPage.Route)">
            <v-list-item v-for="button in menuButtons"
                         :key="button.Title"
                         :title="button.Title"
                         :to="button.Route" />
        </div>
    </v-navigation-drawer>
</template>

<style scoped>
.bg-color-transparent {
    background-color: transparent !important;
}

.navigation-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding-top: 40px;
}
</style>
