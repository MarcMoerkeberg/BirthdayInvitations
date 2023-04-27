<script setup lang="ts">
import { collection, doc } from 'firebase/firestore'
import { useFirestore, useDocument, useCollection } from 'vuefire';
import type Allergies from '../models/Allergies'
import { watch } from 'vue';
import useFamilyStore from '../stores/family'
import useGuestStore from '@/stores/guest';
import useEventStore from '@/stores/event';
import type { Family } from '@/models/Family';
import type { Guest } from '@/models/Guest';
import CollectionNames from '@/models/CollectionNames';
import type Event from '@/models/Event';

const db = useFirestore()
const allergiesDBResult = useDocument<Allergies>(doc(collection(db, CollectionNames.Allergies), import.meta.env.VITE_FIREBASE_ALLERGIESID))
const familiesDBResult = useCollection<Family>(collection(db, CollectionNames.Family))
const guestsDBResult = useCollection<Guest>(collection(db, CollectionNames.Guest))
const eventDBResult = useCollection<Event>(collection(db, CollectionNames.Event))

const familyStore = useFamilyStore()
const guestStore = useGuestStore()
const eventStore = useEventStore()

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
watch(eventDBResult, (newValue, oldValue) => {
    if (newValue != oldValue) {
        eventStore.populateEventFromDbData(newValue)
    }
})
</script>
<template></template>
