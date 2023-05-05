<script setup lang="ts">
import RegistrationComponent from '@/components/RegistrationComponent.vue';
import { isMobile } from '@/helpers/EnviorementHelper';
import useGuestStore from '@/stores/guest';
import { computed } from 'vue';

const isMobileDevice = isMobile()

const guestStore = useGuestStore()
const allGuests = computed(() => { return guestStore.$state.guests })
</script>

<template>
    <v-row>
        <v-col :cols="isMobileDevice ? 12 : 3"
               v-for="guest in allGuests"
               :key="guest.Id">
            <RegistrationComponent :guest="guest" />
        </v-col>
    </v-row>
</template>

<style scoped></style>