<script setup>
import Toast from './components/Toast.vue';
import { useAppStore } from './store/appStore';
import { useRouter, useRoute } from 'vue-router';

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();

const logout = () => {
  localStorage.removeItem('transisi-token');
  router.push('/login')
}

</script>

<template>
  <button v-if="route.meta.auth" class="btn btn-ghost absolute top-2 right-2" @click="logout">Logout</button>
  <RouterView />
  <Teleport to="body">
    <Transition name="fade">
      <Toast v-if="appStore.toast.message"></Toast>
    </Transition>
  </Teleport>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
