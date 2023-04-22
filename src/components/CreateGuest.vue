<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import type Family from '@/models/Family';
import useFamilyStore from '@/stores/family';
import useGuestStore from '@/stores/guest';

const familieStore = useFamilyStore()
const guestStore = useGuestStore()
const allAllergies = computed(() => { return guestStore.allergies.Allergies })
const allFamilies = computed(() => { return familieStore.families })
const familyHint = computed(() => { return selectedFamily.value ? getFamilyMemberNamesForHint(selectedFamily.value) : '' })

function getFamilyMemberNamesForHint(family: Family): string {
    const familyMembers = guestStore.getGuestsAssociatedWithFamily(family)
    var familyNames = ''

    familyMembers.forEach(member => familyNames += `${member.FirstName}, `)

    return familyNames.substring(0, familyNames.length - 2)
}

const familyValidationRules = [(value: Family) => { return value ? true : 'En gæst skal være tilknyttet en familie.' }]
const nameValidationRules = [(value: string) => { return value ? true : 'En gæst skal have et navn.' }]

var guestName = ref('')
var selectedAllergies = ref([])
var selectedFamily = ref<Family>()
var attending = ref<boolean>(false);
</script>

<template>
    <v-col cols="3">
        <v-card color="primary">
            <v-card-title>Gæst</v-card-title>
            <v-divider></v-divider>
            <v-form @submit.prevent>
                <div class="padding-x-10p">
                    <v-text-field :rules="nameValidationRules"
                                  v-model="guestName"
                                  label="Fornavn" />
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
                              :items="allAllergies"
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
                       type="submit">Opret ny gæst</v-btn>
            </v-form>
        </v-card>
    </v-col>
</template>

<style scoped>
.v-text-field {
    margin-top: 20px
}
</style>
