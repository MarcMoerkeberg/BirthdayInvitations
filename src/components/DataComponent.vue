<script setup lang="ts">
import { collection, doc } from 'firebase/firestore'
import { useFirestore, useDocument, useCollection } from 'vuefire';
import type Allergies from '../models/Allergies'
import type Family from '@/models/Family';
import type Guest from '@/models/Guest';
import { watch } from 'vue';
import useFamilyStore from '../stores/family'
import useGuestStore from '@/stores/guest';

const db = useFirestore()
const allergiesDBResult = useDocument<Allergies>(doc(collection(db, 'Allergies'), import.meta.env.VITE_FIREBASE_ALLERGIESID))
const familiesDBResult = useCollection<Family>(collection(db, 'Families'))
const guestsDBResult = useCollection<Guest>(collection(db, 'Guests'))

const familyStore = useFamilyStore()
const guestStore = useGuestStore()

watch(allergiesDBResult, (newValue, oldValue) => {
    if (newValue != oldValue && newValue) {
        guestStore.populateAllergiesFromDbData(newValue)
    }
})
watch(familiesDBResult, (newValue, oldValue) => {
    if (newValue != oldValue) {
        familyStore.populateFamiliesFromDbData(newValue)
    }
})
watch(guestsDBResult, (newValue, oldValue) => {
    if (newValue != oldValue) {
        guestStore.populateGuestsFromDbData(newValue)
    }
})
</script>
<template></template>
