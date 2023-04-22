<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import useGuestStore from '@/stores/guest';

const guestStore = useGuestStore()
const allGuests = computed(() => { return guestStore.guests })
const nameValidationRules = [(value: string) => { return value ? true : 'En Familie skal have et navn.' }]

var selectedGuestIds = ref([])
var familyName = ref('')
</script>

<template>
    <v-col cols="3">
        <v-card color="primary">
            <v-card-title>Familie</v-card-title>
            <v-divider></v-divider>
            <v-form @submit.prevent>
                <div class="padding-x-10p">
                    <v-text-field :rules="nameValidationRules"
                                  v-model="familyName"
                                  label="Familienavn" />
                    <v-select label="Familiemedlemmer"
                              v-model="selectedGuestIds"
                              :items="allGuests"
                              item-title="FirstName"
                              item-value="Id"
                              chips
                              multiple />
                </div>
                <v-divider></v-divider>
                <v-btn color="success"
                       type="submit"
                       size="small"
                       class="action-btn">Opret familie</v-btn>
            </v-form>
        </v-card>
    </v-col>
</template>

<style scoped>
.v-text-field {
    margin-top: 20px
}
</style>
