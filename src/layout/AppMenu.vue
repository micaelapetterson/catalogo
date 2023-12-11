<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'About', icon: 'pi pi-fw pi-home', to: '/about' }]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Pizzas', icon: 'pi pi-fw pi-check-square', to: '/pizza' },
            { label: 'Catalogo', icon: 'pi pi-fw pi-check-square', to: '/list' },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
