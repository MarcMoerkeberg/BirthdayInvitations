<script setup lang="ts">
import routes from '@/models/componentModels/Routes';
import { onBeforeUnmount } from 'vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface MobileMenuProperties {
    showDialog: boolean
}
const componentProps = defineProps<MobileMenuProperties>()

type MobileMenuEmits = {
    (event: 'closeDialog'): void
}
const emits = defineEmits<MobileMenuEmits>()

const menuButtons = routes.getNonHiddenRouteDetails()
const router = useRouter()

function goToPath(route: string) {
    router.push(route)
    emits('closeDialog')
}

function preventScroll(event: TouchEvent) {
    if (componentProps.showDialog) {
        event.preventDefault()
    }
}

// onMounted(() => { window.addEventListener('touchmove', preventScroll, { passive: false }) })
// onBeforeUnmount(() => { window.addEventListener('touchmove', preventScroll) })
</script>

<template>
    <v-dialog v-model="componentProps.showDialog"
              scrollable
              fullscreen
              transition="dialog-top-transition"
              contained>
        <v-sheet class="menu-buttons-container">
            <div class="vertical-center">
                <img src="../assets/images/crafty-champagne-cork.png"
                     width="64"
                     @click="goToPath(routes.LandingPage.Route)">
            </div>
            <v-btn v-for="button in menuButtons"
                   :v-bind="button"
                   size="x-large"
                   variant="text"
                   @click="goToPath(button.Route)">{{ button.Title }}</v-btn>
        </v-sheet>
    </v-dialog>
</template>

<style>
.menu-buttons-container {
    display: flex;
    flex-direction: column;
    gap: 45px;
    justify-content: center;
    padding: 0px 80px;
}
</style>

