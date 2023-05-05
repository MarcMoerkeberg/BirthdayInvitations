<script setup lang="ts">
import RegistrationComponent from '@/components/RegistrationComponent.vue';
import useGuestStore from '@/stores/guest';
import { computed } from 'vue';

const guestStore = useGuestStore()
const allGuests = computed(() => { return guestStore.$state.guests })
</script>

<template>
    <RegistrationComponent v-for="guest in allGuests"
                           :key="guest.Id"
                           :guest="guest" />
</template>

<style scoped></style>