<script setup lang="ts">
import routes from '@/models/componentModels/Routes';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const currentWindowYPosition = ref<number>(window.scrollY || document.documentElement.scrollTop)
const router = useRouter()
const navigationRoutes = routes.getNonHiddenRouteDetails()
const transparentAppBar = computed(() => { return currentWindowYPosition.value < 200 && router.currentRoute.value.path === routes.LandingPage.Route })

onMounted(() => { window.addEventListener("scroll", () => { currentWindowYPosition.value = window.scrollY || document.documentElement.scrollTop }) })
</script>

<template>
    <v-app-bar :color="transparentAppBar ? 'transparent' : 'var(--theme-background-alpha)'"
               elevation="0">
        <span class="fade-in-image overlap-banner img-center-before-titles vertical-center cursor-pointer"
              v-show="!transparentAppBar">
            <img src="../assets/images/crafty-champagne-cork.png"
                 width="50"
                 @click="router.push(routes.LandingPage.Route)">
        </span>
        <v-app-bar-title v-for="route in navigationRoutes"
                         :text="route.Title"
                         :class="['cursor-pointer', { 'calc-left-margin-center': navigationRoutes.indexOf(route) < 1 }]"
                         @click="router.push(route.Route)" />
    </v-app-bar>
</template>
<style scoped>
.img-center-before-titles {
    /*Obviously this i stupid. But I'm not better than this, or rather, timecrunch i real right now. */
    margin-left: calc(100% - 73%);
}

.calc-left-margin-center {
    margin-left: calc(100% - 68%);
}

.v-app-bar {
    /*Fade for appbar color when appearing/diappearing */
    transition: background-color 300ms
}

.v-app-bar-title {
    flex: none;
    margin-right: 60px;
    text-decoration: underline 0.15em rgb(0, 0, 0, 0);
    text-underline-offset: 0.1em;

    /*Sets color and offset after 300ms with a transition */
    transition: text-decoration-color 300ms, text-underline-offset 300ms;
}

.v-app-bar-title:hover {
    text-decoration-color: rgba(255, 255, 255, 1);
    text-underline-offset: 0.3em;
}
</style>

