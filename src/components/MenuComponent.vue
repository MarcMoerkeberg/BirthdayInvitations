<script setup lang="ts">
import { isMobile } from '@/helpers/EnviorementHelper';
import type Menu from '@/models/Menu';
import type MenuItem from '@/models/MenuItem';

interface MenuProps {
    menu: Menu,
    menuItems: Array<MenuItem>
}
const props = defineProps<MenuProps>()

const isMobileDevice: boolean = isMobile()
</script>

<template>
    <v-col :cols="isMobileDevice ? 12 : 6">
        <v-card :title="props.menu.Title">
            <template v-slot:subtitle>
                <span class="white-space-normal">{{ props.menu.Subtitle }}</span>
            </template>
            <template v-if="props.menu.Description"
                      v-slot:text>
                <span class="white-space-normal">{{ props.menu.Description }}</span>
            </template>

            <v-card v-for="menuItem in props.menuItems"
                    :key="menuItem.Id"
                    :title="menuItem.Title"
                    :text="menuItem.Description"
                    elevation="0"
                    variant="tonal"
                    class="margin-east-west-south-20p">
                <template v-slot:subtitle>
                    <span class="white-space-normal">{{ menuItem.Subtitle }}</span>
                </template>
            </v-card>
        </v-card>
    </v-col>
</template>

<style scoped>
.white-space-normal {
    white-space: normal;
}

.margin-east-west-south-20p {
    margin: 0px 20px 20px 20px
}
</style>