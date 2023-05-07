<script setup lang="ts">
import { isMobile } from '@/helpers/EnviorementHelper';
import routes from '@/models/componentModels/Routes';
import { computed } from 'vue';
import useEventStore from '@/stores/event';
import { formatDateRange } from '@/helpers/DateHelper';

interface EventProps {
    registration?: true
    menu?: true
}
const props = defineProps<EventProps>()

const isMobileDevice = isMobile()

const eventStore = useEventStore()
const event = computed(() => { return eventStore.$state.event })
const eventSubtitle = computed(() => {
    let dateRange: string = '';

    if (event.value.BeginDate) {
        dateRange = formatDateRange(event.value.BeginDate, event.value.EndDate)
    }

    return `${event.value.Subtitle} ${dateRange}`
})

const actionButtons = computed(() => {
    let allButtons = [
        { ...routes.Registration, show: props.registration },
        { ...routes.Menu, show: props.menu },
    ]

    return allButtons.filter(button => button.show)
}) 
</script>

<template>
    <v-card :title="event.Name"
            :subtitle="eventSubtitle"
            v-show="event.Id">
        <v-card-text v-html="event.Description" />
        <v-row v-if="!isMobileDevice && actionButtons.length > 0"
               justify="space-evenly"
               class="margin-bottom-20p">
            <v-btn v-for="button in actionButtons"
                   :key="button.Route"
                   size="large"
                   color="secondary"
                   :prepend-icon="button.Icon"
                   :to="button.Route"> {{ button.Title }} </v-btn>
        </v-row>
    </v-card>

    <v-row v-if="isMobileDevice && actionButtons.length > 0 && event.Id"
           align="center"
           justify="space-evenly">
        <v-col cols="auto"
               v-for="button in actionButtons"
               :key="button.Route">
            <v-btn size="x-large"
                   color="secondary"
                   :icon="button.Icon"
                   :to="button.Route" />
        </v-col>
    </v-row>
</template>