<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';
import { useAppStore } from '../store/appStore';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();

const name = ref('');
const job = ref('');

const createUser = () => {
  const payload = {
    name: name.value,
    job: job.value
  };

  userStore.createUser(payload).then(() => router.push('/'));
}
</script>

<template>
  <div class="card w-96 bg-white">
    <div class="card-body p-0 flex flex-col gap-y-6">
      <h2 class="card-title justify-center">Tambah User</h2>
      <div class="flex flex-col gap-y-3">
        <div class="form-control w-full max-w-xs">
          <label for="name" class="label">
            <span class="label-text">Nama</span>
          </label>
          <input v-model="name" id="name" name="name" type="text" required class="input input-bordered w-full max-w-xs" @keypress.enter="createUser" />
        </div>
        <div class="form-control w-full max-w-xs">
          <label for="job" class="label">
            <span class="label-text">Pekerjaan</span>
          </label>
          <input v-model="job" id="job" name="job" type="text" required class="input input-bordered w-full max-w-xs" @keypress.enter="createUser" />
        </div>
      </div>
      <div>
        <div class="card-actions justify-end">
          <RouterLink to="/" class="btn btn-ghost">Kembali</RouterLink>
          <button :class="['btn btn-primary', appStore.appState === 'loading' ? 'loading' : '']" :disabled="appStore.appState === 'loading'" @click="createUser">Tambah</button>
        </div>
      </div>
    </div>
  </div>
</template>