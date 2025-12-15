<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="layout-base">
    <AppHeader class="layout-base__header"/>
    <main class="layout-base__main">
      <router-view/>
    </main>
    <AppFooter class="layout-base__footer"/>
  </div>
</template>

<style lang="scss">
@import '@/shared/styles/variables';

.layout-base {
  display: grid;
  grid-template-rows: $header-height 1fr auto;
  grid-template-areas:
        "header"
        "main"
        "footer";
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: $white;

  &__header {
    grid-area: header;
    width: 100%;
  }

  &__main {
    grid-area: main;
    background: $light;
    padding: $spacing-md $spacing-xl;
    overflow-y: auto;
    width: 100%;
  }

  &__footer {
    grid-area: footer;
    width: 100%;
  }
}
</style>