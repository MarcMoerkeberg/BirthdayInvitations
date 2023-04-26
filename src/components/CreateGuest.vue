<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { computed } from 'vue';
import useFamilyStore from '@/stores/family';
import useGuestStore from '@/stores/guest';
import type ValidationReponse from '@/models/VlidationReponse';
import type { Family } from '@/models/Family';
import type { NewGuest } from '@/models/Guest';

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

const familyValidationRules = [(value: Family) => { return !!value.Id || 'En gæst skal være tilknyttet en familie.' }]
const nameValidationRules = [(value: string) => { return !!value || 'En gæst skal have et for- og efternavn.' }]
const validationForm: Ref<HTMLFormElement | undefined> = ref()

var guestFirstName = ref('')
var guestLastName = ref('')
var selectedAllergies = ref([])
var selectedFamily = ref<Family>()
var attending = ref<boolean>(false);


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
    }
}
</script>

<template>
    <v-col cols="3">
        <v-card color="primary">
            <v-card-title>Gæst</v-card-title>
            <v-divider></v-divider>
            <v-form ref="validationForm">
                <div class="padding-x-10p">
                    <v-text-field :rules="nameValidationRules"
                                  v-model="guestFirstName"
                                  label="Fornavn" />
                    <v-text-field :rules="nameValidationRules"
                                  v-model="guestLastName"
                                  label="Efternavn" />
                    <v-select :items="allFamilies"
                              item-title="Name"
                              item-value="Id"
                              label="Familie"
                              v-model="selectedFamily"
                              clearable
                              return-object
                              :hint="familyHint"
                              persistent-hint
                              :rules="familyValidationRules" />
                    <v-select label="Allergier"
                              v-model="selectedAllergies"
                              :items="allAllergies.Allergies"
                              chips
                              multiple
                              clearable />
                </div>
                <v-checkbox v-model="attending"
                            label="Deltager" />
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
