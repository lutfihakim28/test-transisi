<script setup>
import { useAppStore } from '../store/appStore';
import { computed } from '@vue/reactivity';

const appStore = useAppStore();
const toast = computed(() => appStore.toast);

</script>

<template>
  <div class="toast toast-end toast-top">
  <div :class="['alert', toast.type]">
    <div class="text-white">
      <span>{{ toast.message }}</span>
    </div>
  </div>
</div>
</template>