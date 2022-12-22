<script setup>
import { onMounted, computed, ref } from 'vue';
import { useUserStore } from '../store/userStore';
import { useAppStore } from '../store/appStore';

const userStore = useUserStore();
const appStore = useAppStore();

const users = computed(() => userStore.listUser);
const pagination = computed(() => userStore.pagination);

const selectedId = ref();

const changePage = (page) => {
  userStore.getListUser({page: page})
};

const deleteUser = () => {
  userStore.deleteUser(selectedId.value).then(() => {
    window.location.hash = '#'
  })
}

const setId = (id) => {
  selectedId.value = id;
}

onMounted(() => {
  userStore.getListUser({page: 1})
})
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">List User</h2>
      <RouterLink to="/create" class="btn btn-success text-white">Tambah User</RouterLink>
    </div>
    <table class="table w-full mt-2">
      <!-- head -->
      <thead>
        <tr class="border-b border-gray-100">
          <th class="bg-gray-50">Avatar</th>
          <th class="w-40 bg-gray-50">Name</th>
          <th class="w-72 bg-gray-50">Email</th>
          <th class="bg-gray-50 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="user in users" :key="user.id">
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img :src="user.avatar" :alt="user.first_name" />
                </div>
              </div>
            </div>
          </td>
          <td>
            {{ user.first_name + ' ' + user.last_name }}
          </td>
          <th>
            {{ user.email }}
          </th>
          <th>
            <div class="flex gap-x-2">
              <RouterLink to="/" class="btn btn-square btn-primary btn-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                </svg>
              </RouterLink>
              <RouterLink to="/" class="btn btn-square btn-warning text-white btn-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </RouterLink>
              <a href="#my-modal" class="btn btn-square btn-error text-white btn-sm" @click="setId(user.id)">
                <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
              </a>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
    <div class="btn-group mt-6">
      <button v-for="page in pagination.totalPage" :key="page" :class="['btn', page === pagination.page ? 'btn-active' : '']" @click="changePage(page)">{{ page }}</button>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="fade">
        <div class="modal" id="my-modal">
          <div class="modal-box">
            <a href="#" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</a>
            <h3 class="font-bold text-lg">Hapus User?</h3>
            <p class="py-4">User akan terhapus secara permanen</p>
            <div class="modal-action">
              <button :class="['btn btn-error text-white', appStore.appState === 'loading' ? 'loading': '']" :disabled="appStore.appState === 'loading'" @click="deleteUser">Ya, Hapus</button>
            </div>
          </div>
        </div>
    </Transition>
  </Teleport>
</template>