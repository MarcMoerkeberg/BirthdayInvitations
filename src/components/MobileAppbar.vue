<script setup lang="ts">
import { ref } from 'vue';
import MobileMenuDialog from './MobileMenuDialog.vue';

const showDialog = ref<boolean>(false);
</script>

<template>
    <div
         :class="[showDialog ? 'justify-space-between' : 'justify-end', { 'bg-color-vuetifybackground': showDialog }, 'overlap-banner', 'mobile-toolbar']">
        <v-card-title v-show="showDialog">Marcs 30 års fødselsdag</v-card-title>
        <v-btn density="default"
               :icon="showDialog ? 'mdi-close' : 'mdi-menu'"
               variant="text"
               class="bg-color-transparent"
               size="x-large"
               @click="showDialog = !showDialog" />
    </div>
    <div class="menu-dialog-container">
        <MobileMenuDialog :show-dialog="showDialog"
                          @close-dialog="showDialog = false" />
    </div>
</template>

<style scoped>
.menu-dialog-container {
    height: calc(100vh - 64px);
    width: 100vw;
    margin-top: 64px;
    position: absolute;
}
</style>
