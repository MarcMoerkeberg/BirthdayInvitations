<script setup lang="ts">
import routes from '@/models/componentModels/Routes';
import type Location from '../models/Location'
import { computed } from 'vue';
import { isMobile } from '@/helpers/EnviorementHelper';
import { onMounted } from 'vue';

interface LocationProps {
    Location: Location
    Registration?: true
    GoogleMaps?: true
    Website?: true
}
const props = defineProps<LocationProps>();

const isMobileDevice = isMobile()

/* Used for googles api map search, from docs as of 04.05.2023 - https://developers.google.com/maps/documentation/urls/get-started*/
const addressQuery = computed(() => { return props.Location.Address.replace(' ', '+').replace(',', '%2C') })
const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${addressQuery}&query_place_id=${props.Location.GooglePlaceId}`;

const actionButtons = computed(() => {
    let allButtons = [
        { title: 'Tilmelding', show: props.Registration, icon: routes.Registration.Icon, link: routes.Registration.Route },
        { title: 'Google maps', show: props.GoogleMaps, icon: 'mdi-map-marker', link: googleMapsLink },
        { title: 'Besøg webside', show: props.Website, icon: 'mdi-open-in-new', link: props.Location.Website },
    ]

    return allButtons.filter(button => button.show)
}) 
</script>

<template>
    <v-card :title="props.Location.Name"
            :subtitle="props.Location.Subtitle"
            :text="props.Location.Description">
        <v-row justify="space-evenly">
            <v-btn v-if="isMobileDevice"
                   v-for="button in actionButtons"
                   :key="button.title + '-mobile'"
                   size="large"
                   color="secondary"
                   :icon="button.icon"
                   :href="button.link" />

            <v-btn v-else
                   v-for="button in actionButtons"
                   :key="button.title + '-desktop'"
                   color="secondary"
                   :prepend-icon="button.icon"
                   :href="button.link"> {{ button.title }} </v-btn>
        </v-row>
    </v-card>
</template>

<style scoped>
.v-row {
    gap: 30px;
    margin-bottom: 20px;
}
</style>