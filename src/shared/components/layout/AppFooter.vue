<script setup lang="ts">
import {computed} from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="app-footer">
    <p>&copy; {{ currentYear }} BigFlytec - Todos os direitos reservados</p>
  </footer>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.app-footer {
  background: $white;
  padding: $spacing-md $spacing-xl;
  text-align: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    color: $gray-dark;
    font-size: 0.875rem;
  }
}
</style>
