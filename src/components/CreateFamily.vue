<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { computed } from 'vue';
import useGuestStore from '@/stores/guest';
import type ValidationReponse from '@/models/VlidationReponse';
import useFamilyStore from '@/stores/family';
import type { NewFamily } from '@/models/Family';

const guestStore = useGuestStore()
const familyStore = useFamilyStore()
const allGuests = computed(() => { return guestStore.guests })
const nameValidationRules = [(value: string) => { return value ? true : 'En Familie skal have et navn.' }]
const validationForm: Ref<HTMLFormElement | undefined> = ref()

var selectedGuestIds = ref([])
var familyName = ref('')

async function createFamily(): Promise<void> {
    const isInputformValid: ValidationReponse = await validationForm.value?.validate()
    if (isInputformValid.valid) {
        const newFamily: NewFamily = {
            Name: familyName.value,
            MemberIds: selectedGuestIds.value
        }

        familyStore.createNewFamily(newFamily)
        await validationForm.value?.reset()
    }
}
</script>

<template>
    <v-col cols="3">
        <v-card color="primary">
            <v-card-title>Familie</v-card-title>
            <v-divider></v-divider>
            <v-form ref="validationForm">
                <div class="padding-x-10p">
                    <v-text-field :rules="nameValidationRules"
                                  v-model="familyName"
                                  label="Familienavn" />
                    <v-select label="Familiemedlemmer"
                              v-model="selectedGuestIds"
                              :items="allGuests"
                              :item-title="guest => `${guest.FirstName} ${guest.LastName}`"
                              item-value="Id"
                              chips
                              multiple />
                </div>
                <v-divider></v-divider>
                <v-btn color="success"
                       size="small"
                       class="action-btn"
                       @click="createFamily">Opret familie</v-btn>
            </v-form>
        </v-card>
    </v-col>
</template>

<style scoped>
.v-text-field {
    margin-top: 20px
}
</style>
