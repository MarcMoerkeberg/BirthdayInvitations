<script setup lang="ts">
import RegistrationComponent from '@/components/RegistrationComponent.vue';
import { isMobile } from '@/helpers/EnviorementHelper';
import useGuestStore from '@/stores/guest';
import { computed } from 'vue';
import { useCurrentUser } from 'vuefire';

const isMobileDevice = isMobile()

const guestStore = useGuestStore()
const currentUser = useCurrentUser()
const allGuests = computed(() => { return currentUser.value ? guestStore.$state.guests : guestStore.getGuestsAssociatedWithCurrentFamily })
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