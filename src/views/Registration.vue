<script setup lang="ts">
import RegistrationComponent from '@/components/RegistrationComponent.vue';
import { isMobile } from '@/helpers/EnviorementHelper';
import useFamilyStore from '@/stores/family';
import useGuestStore from '@/stores/guest';
import { computed, ref } from 'vue';
import { useCurrentUser } from 'vuefire';

const isMobileDevice = isMobile()

const searchInput = ref<string | undefined>();

const familyStore = useFamilyStore()
const guestStore = useGuestStore()
const currentUser = useCurrentUser()
const allGuests = computed(() => { return currentUser.value ? guestStore.getAllGuests(searchInput.value) : guestStore.getGuestsAssociatedWithCurrentFamily })

</script>

<template>
    <v-row v-if="currentUser"
           justify="center">
        <v-col cols="6">
            <v-text-field label="Søg efter bruger"
                          v-model="searchInput"
                          clearable />
        </v-col>
    </v-row>
    <v-row>
        <v-col :cols="isMobileDevice ? 12 : 3"
               v-for="guest in allGuests"
               :key="guest.Id">
            <RegistrationComponent :guest="guest"
                                   :family-id="familyStore.getFamilyIdFromGuest(guest.Id)" />
        </v-col>
    </v-row>
</template>

<style scoped></style>