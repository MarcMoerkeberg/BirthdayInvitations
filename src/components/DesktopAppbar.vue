<script setup lang="ts">
import routes from '@/models/componentModels/Routes';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const currentWindowYPosition = ref<number>(window.scrollY || document.documentElement.scrollTop)
onMounted(() => { window.addEventListener("scroll", () => { currentWindowYPosition.value = window.scrollY || document.documentElement.scrollTop }) })
const router = useRouter()
const navigationRoutes = routes.getNonHiddenRouteDetails()

</script>

<template>
    <v-app-bar :color="currentWindowYPosition < 200 ? 'transparent' : 'var(--theme-background-alpha)'"
               elevation="0">
        <v-app-bar-title v-for="route in navigationRoutes"
                         :text="route.Title"
                         :class="['cursor-pointer', { 'calc-left-margin-center': navigationRoutes.indexOf(route) < 1 }]"
                         @click="router.push(route.Route)" />
    </v-app-bar>
</template>
<style scoped>
.calc-left-margin-center {
    margin-left: calc(100% - 70%);
}

.v-app-bar {
    /*Fade for appbar color when appearing/diappearing */
    transition: background-color 300ms
}

.v-app-bar-title {
    flex: none;
    margin-right: 80px;
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

