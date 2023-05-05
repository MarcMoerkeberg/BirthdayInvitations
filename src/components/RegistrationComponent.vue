<script setup lang="ts">
import { ref } from 'vue';
import { AttendingType } from '@/models/componentModels/AttendingType';
import { isMobile } from '@/helpers/EnviorementHelper';
import type { Guest } from '@/models/Guest';
import { computed } from 'vue';
import { watch } from 'vue';
import useGuestStore from '@/stores/guest';

interface RegistrationProps {
    guest: Guest
}
const props = defineProps<RegistrationProps>()

const guestStore = useGuestStore()
const isMobileDevice = isMobile()

const guestName = computed(() => { return `${props.guest.FirstName} ${props.guest.LastName}` })

var attending = ref<Array<AttendingType>>(props.guest.Attending)
watch(attending, () => { guestStore.updateGuestAttending(props.guest, attending.value) })

const allAllergies = computed(() => { return guestStore.allergies })
var selectedAllergies = ref<Array<string>>(props.guest.Allergies)
watch(selectedAllergies, () => { guestStore.updateGuestAllergies(props.guest, selectedAllergies.value) })
</script>

<template>
    <v-col :cols="isMobileDevice ? 12 : 3">
        <v-card color="primary"
                :title="guestName">
            <v-container>
                <v-switch v-model="attending"
                          density="compact"
                          :value="AttendingType.Birthday"
                          color="secondary"
                          label="Detager på havrevang" />
                <v-switch v-model="attending"
                          density="compact"
                          color="secondary"
                          :value="AttendingType.Surf"
                          label="Detager til surf" />
                <v-switch v-model="attending"
                          density="compact"
                          color="secondary"
                          :value="AttendingType.Lunch"
                          label="Ønsker frokost på stranden" />
                <v-select label="Allergier"
                          v-model="selectedAllergies"
                          :items="allAllergies.Allergies"
                          chips
                          multiple
                          clearable />
            </v-container>
        </v-card>
    </v-col>
</template>
