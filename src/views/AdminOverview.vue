<script setup lang="ts">
import CreateGuest from '@/components/admin/CreateGuest.vue';
import CreateFamily from '@/components/admin/CreateFamily.vue';
import EventInformation from '@/components/admin/EventInformation.vue';
import { ref } from 'vue';

const tab = ref<number>(1)
</script>

<template>
    <v-tabs v-model="tab"
            align-tabs="center">
        <v-tab :value="1">Information</v-tab>
        <v-tab :value="2">Opret</v-tab>
    </v-tabs>

    <EventInformation v-if="tab === 1" />
    <v-row v-if="tab === 2">
        <CreateGuest />
        <CreateFamily />
    </v-row>
</template>

<style coped>
.v-row {
    margin: 10px
}
</style>

