<script setup lang="ts">
import { collection, doc } from 'firebase/firestore'
import { useFirestore, useDocument, useCollection } from 'vuefire';
import type Allergies from '@/models/Allergies'
import { watch } from 'vue';
import useFamilyStore from '@/stores/family'
import useGuestStore from '@/stores/guest';
import useEventStore from '@/stores/event';
import type { Family } from '@/models/Family';
import type { Guest } from '@/models/Guest';
import CollectionNames from '@/models/CollectionNames';
import type Event from '@/models/Event';
import useLocationStore from '@/stores/location';
import type Location from '@/models/Location';
import useMenuStore from '@/stores/menu';
import type Menu from '@/models/Menu';
import type MenuItem from '@/models/MenuItem';

const db = useFirestore()
const allergiesDBResult = useDocument<Allergies>(doc(collection(db, CollectionNames.Allergies), import.meta.env.VITE_FIREBASE_ALLERGIESID))
const familiesDBResult = useCollection<Family>(collection(db, CollectionNames.Family))
const guestsDBResult = useCollection<Guest>(collection(db, CollectionNames.Guest))
const eventDBResult = useCollection<Event>(collection(db, CollectionNames.Event))
const locationDBResult = useCollection<Location>(collection(db, CollectionNames.Location))
const menuDBResult = useCollection<Menu>(collection(db, CollectionNames.Menu))
const menuItemsDBResult = useCollection<MenuItem>(collection(db, CollectionNames.MenuItem))

const familyStore = useFamilyStore()
const guestStore = useGuestStore()
const eventStore = useEventStore()
const locationStore = useLocationStore()
const menuStore = useMenuStore()

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
watch(locationDBResult, (newValue, oldValue) => {
    if (newValue != oldValue) {
        locationStore.populateEventFromDbData(newValue)
    }
})
watch(menuDBResult, (newValue, oldValue) => {
    if (newValue != oldValue) {
        menuStore.populateMenuFromDbData(newValue)
    }
})
watch(menuItemsDBResult, (newValue, oldValue) => {
    if (newValue != oldValue) {
        menuStore.populateMenuItemsFromDbData(newValue)
    }
})
</script>
<template></template>
