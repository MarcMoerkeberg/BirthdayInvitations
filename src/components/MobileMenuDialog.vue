<script setup lang="ts">
import Routes, { isRouteDetails, type RouteDetails } from '@/models/componentModels/Routes';
import { ref } from 'vue';
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

const menuButtons = ref<Array<RouteDetails>>([])
const router = useRouter()
onMounted(() => { initButtons() })

function goToPath(route: string) {
    router.push(route)
    emits('closeDialog')
}
function initButtons() {
    const routePropsAsArray: Array<Array<string | RouteDetails>> = Object.entries(Routes)

    routePropsAsArray.forEach(propertyArray => {
        const routeDetails = propertyArray.find(property => isRouteDetails(property)) as RouteDetails
        if (!routeDetails.IsHiddenRoute) {
            menuButtons.value.push(routeDetails)
        }
    })
}
</script>

<template>
    <v-dialog v-model="componentProps.showDialog"
              fullscreen
              transition="dialog-top-transition"
              contained>
        <v-sheet class="menu-buttons-container">
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

