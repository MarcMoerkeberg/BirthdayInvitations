<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { computed } from 'vue';
import useFamilyStore from '@/stores/family';
import useGuestStore from '@/stores/guest';
import type ValidationReponse from '@/models/VlidationReponse';
import type { Family } from '@/models/Family';
import type { NewGuest } from '@/models/Guest';
import { AttendingType } from '@/models/componentModels/AttendingType';

const familieStore = useFamilyStore()
const guestStore = useGuestStore()
const allAllergies = computed(() => { return guestStore.allergies })
const allFamilies = computed(() => { return familieStore.families })
const familyHint = computed(() => { return selectedFamily.value ? getFamilyMemberNamesForHint(selectedFamily.value) : '' })

function getFamilyMemberNamesForHint(family: Family): string {
    const familyMembers = guestStore.getGuestsAssociatedWithFamily(family)
    var familyNames = ''

    familyMembers.forEach(member => familyNames += `${member.FirstName}, `)

    return familyNames.substring(0, familyNames.length - 2)
}

function getFamilyNameForSelector(family: Family): string {
    let familyMemberNames = getFamilyMemberNamesForHint(family)

    return familyMemberNames ? `${family.Name} (${familyMemberNames})` : family.Name
}

const nameValidationRules = [(value: string) => { return !!value || 'En gæst skal have et for- og efternavn.' }]
const validationForm: Ref<HTMLFormElement | undefined> = ref()

var guestFirstName = ref('')
var guestLastName = ref('')
var selectedAllergies = ref([])
var selectedFamily = ref<Family>()
var attending = ref<Array<AttendingType>>([])

async function createGuest(): Promise<void> {
    const isInputformValid: ValidationReponse = await validationForm.value?.validate()
    if (isInputformValid.valid) {
        const newGuest: NewGuest = {
            FirstName: guestFirstName.value,
            LastName: guestLastName.value,
            Allergies: selectedAllergies.value,
            Attending: attending.value,
        }
        const guestFamily: Family = selectedFamily.value ?? { Id: '', MemberIds: [], Name: '' }

        await guestStore.createNewGuest(newGuest, guestFamily)
        await validationForm.value?.reset()
        attending.value = []
    }
}
</script>

<template>
    <v-col cols="3">
        <v-card color="primary">
            <v-card-title>Gæst</v-card-title>
            <v-divider></v-divider>
            <v-form ref="validationForm">
                <v-container>
                    <v-text-field :rules="nameValidationRules"
                                  v-model="guestFirstName"
                                  label="Fornavn" />
                    <v-text-field :rules="nameValidationRules"
                                  v-model="guestLastName"
                                  label="Efternavn" />
                    <v-select :items="allFamilies"
                              :item-title="item => getFamilyNameForSelector(item as Family)"
                              item-value="Id"
                              label="Familie"
                              v-model="selectedFamily"
                              clearable
                              return-object
                              :hint="familyHint"
                              persistent-hint />
                    <v-select label="Allergier"
                              v-model="selectedAllergies"
                              :items="allAllergies.Allergies"
                              chips
                              multiple
                              clearable />
                    <v-switch v-model="attending"
                              :value="AttendingType.Birthday"
                              color="secondary"
                              label="Detager på havrevang" />
                    <v-switch v-model="attending"
                              color="secondary"
                              :value="AttendingType.Surf"
                              label="Detager til surf" />
                    <v-switch v-model="attending"
                              color="secondary"
                              :value="AttendingType.Lunch"
                              label="Ønsker frokost på stranden" />
                </v-container>
                <v-divider></v-divider>
                <v-btn color="success"
                       size="small"
                       class="action-btn"
                       @click="createGuest">Opret ny gæst</v-btn>
            </v-form>
        </v-card>
    </v-col>
</template>

<style scoped>
.v-text-field {
    margin-top: 20px
}
</style>
