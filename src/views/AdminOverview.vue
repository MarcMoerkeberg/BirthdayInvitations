<script setup lang="ts">
import CreateGuest from '@/components/admin/CreateGuest.vue';
import CreateFamily from '@/components/admin/CreateFamily.vue';
</script>

<template>
    <v-row>
        <CreateGuest />
        <CreateFamily />
    </v-row>
</template>

<style coped>
.v-row {
    margin: 10px
}
</style>

