<script setup lang="ts">
import { isMobile } from '@/helpers/EnviorementHelper';
import { computed } from 'vue';
import LocationComponent from '@/components/LocationComponent.vue';
import useLocationStore from '@/stores/location';
import EventComponent from '@/components/EventComponent.vue';

const locationStore = useLocationStore()
const locations = computed(() => { return locationStore.$state.locations })

const isMobileDevice = isMobile()
</script>

<template>
    <v-row class="justify-end">
        <v-col :cols="isMobileDevice ? 12 : 7">
            <EventComponent />
        </v-col>
        <v-col v-for="location in locations"
               :key="location.Id"
               :cols="isMobileDevice ? 12 : 5">
            <LocationComponent :location="location"
                               googleMaps
                               website
                               registration />
        </v-col>
    </v-row>
</template>