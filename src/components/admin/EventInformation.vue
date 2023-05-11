<script setup lang="ts">
import { AttendingType } from '@/models/componentModels/AttendingType';
import useGuestStore from '@/stores/guest';
import { computed } from 'vue';


const guestStore = useGuestStore()
const numberAttendingEvent = computed(() => { return `${guestStore.getNumberOfGuestsAttendingByType(AttendingType.Birthday)}/${guestStore.getTotalNumberOfGuests}` })
const numberAttendingSurf = computed(() => { return `${guestStore.getNumberOfGuestsAttendingByType(AttendingType.Surf)}/${guestStore.getTotalNumberOfGuests}` })
const numberAttendingBeach = computed(() => { return `${guestStore.getNumberOfGuestsAttendingByType(AttendingType.Lunch)}/${guestStore.getTotalNumberOfGuests}` })
</script>

<template>
    <v-container>
        <v-col cols="5">
            <v-card title="Deltager information">
                <v-card-text>Antal deltagere på Havrevang: {{ numberAttendingEvent }}</v-card-text>
                <v-card-text>Antal deltagere til surf: {{ numberAttendingSurf }}</v-card-text>
                <v-card-text>Antal deltagere på stranden: {{ numberAttendingBeach }}</v-card-text>
            </v-card>
        </v-col>
    </v-container>
</template>



