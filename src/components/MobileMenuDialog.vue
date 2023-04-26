<script setup lang="ts">
import routes, { type RouteDetails } from '@/models/componentModels/Routes';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface MobileMenuProperties {
    showDialog: boolean
}
const componentProps = defineProps<MobileMenuProperties>()

type MobileMenuEmits = {
    (event: 'closeDialog'): void
}
const emits = defineEmits<MobileMenuEmits>()

const menuButtons = ref<Array<RouteDetails>>(routes.getNonHiddenRouteDetails())
const router = useRouter()

function goToPath(route: string) {
    router.push(route)
    emits('closeDialog')
}

</script>

<template>
    <v-dialog v-model="componentProps.showDialog"
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

