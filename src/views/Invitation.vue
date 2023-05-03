<script setup lang="ts">
import type { RouteDetails } from '@/models/componentModels/Routes';
import routes from '@/models/componentModels/Routes';
import useEventStore from '@/stores/event';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const eventStore = useEventStore()
const eventDescription = computed(() => { return eventStore.$state.event.Description })
const buttonRoutes: Array<RouteDetails> = [routes.Registration, routes.Menu]
</script>

<template>
    <v-container>
        <v-card title="Invitation"
                v-show="eventDescription"
                subtitle="Marc's 30 års fødselsdag d. 23-25 Juni."
                :text="eventDescription" />

        <v-row align="center"
               justify="space-evenly">
            <v-col cols="auto"
                   v-for="routeDetails in buttonRoutes">
                <v-btn size="x-large"
                       color="secondary"
                       :icon="routeDetails.Icon"
                       @click="router.push(routeDetails.Route)" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped></style>