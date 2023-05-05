<script setup lang="ts">
import routes from '@/models/componentModels/Routes';
import type Location from '../models/Location'
import { computed } from 'vue';
import { isMobile } from '@/helpers/EnviorementHelper';
import { formatFullDate } from '@/helpers/DateHelper';

interface LocationProps {
    location: Location
    registration?: true
    googleMaps?: true
    website?: true
}
const props = defineProps<LocationProps>();

const isMobileDevice = isMobile()

/* Used for googles api map search, from docs as of 04.05.2023 - https://developers.google.com/maps/documentation/urls/get-started*/
const addressQuery = computed(() => { return props.location.Address.replace(' ', '+').replace(',', '%2C') })
const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${addressQuery}&query_place_id=${props.location.GooglePlaceId}`;

const actionButtons = computed(() => {
    let allButtons = [
        { title: routes.Registration.Title, show: props.registration, icon: routes.Registration.Icon, link: routes.Registration.Route },
        { title: 'Google maps', show: props.googleMaps, icon: 'mdi-map-marker', link: googleMapsLink },
        { title: 'Besøg webside', show: props.website, icon: 'mdi-open-in-new', link: props.location.Website },
    ]

    return allButtons.filter(button => button.show)
})
const subtitle = computed(() => {
    let subtitle = props.location.Subtitle
    if (props.location.BeginDate && !props.location.Subtitle) {
        subtitle = formatFullDate(props.location.BeginDate)
    }

    return subtitle
}) 
</script>

<template>
    <v-card :title="props.location.Name"
            :subtitle="subtitle">
        <v-card-text v-html="props.location.Description" />

        <v-row justify="space-evenly"
               class="margin-bottom-20p">
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