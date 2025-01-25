<script setup lang="ts">
import useMenuStore from '@/stores/menu';
import { computed } from 'vue';
import MenuComponent from '@/components/MenuComponent.vue';
import type Menu from '@/models/Menu';

const menuStore = useMenuStore()
const menus = computed(() => { return menuStore.$state.menus })
function menuItems(menu: Menu) { return menuStore.getMenuItems(menu) }

</script>

<template>
    <v-row>
        <MenuComponent v-for="menu in menus"
                       :key="menu.Id"
                       :menu="menu"
                       :menu-items="menuItems(menu)" />
    </v-row>
</template>