<script setup lang="ts">
import { ref } from 'vue';
import { AttendingType } from '@/models/componentModels/AttendingType';
import type { Guest } from '@/models/Guest';
import { computed } from 'vue';
import { watch } from 'vue';
import useGuestStore from '@/stores/guest';
import { useCurrentUser } from 'vuefire';

interface RegistrationProps {
    guest: Guest,
}
const props = defineProps<RegistrationProps>()

const currentUser = useCurrentUser()
const guestStore = useGuestStore()
const guestName = computed(() => { return `${props.guest.FirstName} ${props.guest.LastName}` })

var attending = ref<Array<AttendingType>>(props.guest.Attending)
watch(attending, () => { guestStore.updateGuestAttending(props.guest, attending.value) })

const allAllergies = computed(() => { return guestStore.allergies })
var selectedAllergies = ref<Array<string>>(props.guest.Allergies)
watch(selectedAllergies, () => { guestStore.updateGuestAllergies(props.guest, selectedAllergies.value) })

const showSnackBar = ref<boolean>(false)
function copyRegistrationLink() {
    showSnackBar.value = true
    navigator.clipboard.writeText(`${window.location.origin}/${props.guest.Id}`);
}
</script>

<template>
    <v-card color="primary"
            :title="guestName">
        <v-container>
            <v-btn v-if="currentUser"
                   size="small"
                   color="grey-darken-2"
                   prepend-icon="mdi-content-copy"
                   @click="copyRegistrationLink"
                   class="margin-bottom-20p"> Kopiér tilmeldingslink </v-btn>
            <v-snackbar v-model="showSnackBar"
                        location="bottom center"
                        color="secondary">{{ `${props.guest.FirstName}'s tilmeldingslink kopieret.'` }}</v-snackbar>
            <v-switch v-model="attending"
                      density="compact"
                      :value="AttendingType.Birthday"
                      color="secondary"
                      label="Deltager på havrevang" />
            <v-switch v-model="attending"
                      density="compact"
                      color="secondary"
                      :value="AttendingType.Surf"
                      label="Deltager til surf" />
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
</template>
