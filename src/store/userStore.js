import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useAppStore } from "./appStore";

export const useUserStore = defineStore('user', () => {
  const appStore = useAppStore();
  const baseUrl = appStore.baseUrl;
  const listUser = ref([]);
  const user = ref();
  const pagination = reactive({
    page: 1,
    totalPage: 1,
  })

  const getListUser = async (query) => {
    const qs = new URLSearchParams();
    qs.append('page', query.page)
    try {
      const response = await axios.get(`${baseUrl}/users?${qs.toString()}`)
      listUser.value = response.data.data;
      pagination.page = response.data.page;
      pagination.totalPage = response.data.total_pages;
      appStore.setToast({
        message: 'Berhasil memuat data',
        type: 'alert-success'
      })
      setTimeout(() => {
        appStore.clearToast()
      }, 4000);
    } catch (error) {
      appStore.setToast({
        message: 'Gagal memuat data',
        type: 'alert-error'
      })
      setTimeout(() => {
        appStore.clearToast()
      }, 4000);
    }
  };

  const getUser = async (query) => {
    const qs = new URLSearchParams();
    qs.append('page', query.page)
    try {
      const response = await axios.get(`${baseUrl}/users?${qs.toString()}`)
      listUser.value = response.data.data;
      pagination.page = response.data.page;
      pagination.totalPage = response.data.total_pages;
      appStore.setToast({
        message: 'Berhasil memuat data',
        type: 'alert-success'
      })
      setTimeout(() => {
        appStore.clearToast()
      }, 4000);
    } catch (error) {
      appStore.setToast({
        message: 'Gagal memuat data',
        type: 'alert-error'
      })
      setTimeout(() => {
        appStore.clearToast()
      }, 4000);
    }
  };

  const deleteUser = async (id) => {
    appStore.appState = 'loading';
    try {
      const response = await axios.delete(`${baseUrl}/users/${id}`);
      appStore.setToast({
        message: 'Berhasil menghapus user',
        type: 'alert-success'
      })
      setTimeout(() => {
        appStore.clearToast()
      }, 4000);
      appStore.appState = 'ready';
      return Promise.resolve();

    } catch (error) {
      appStore.setToast({
        message: 'Gagal menghapus user',
        type: 'alert-error'
      })
      setTimeout(() => {
        appStore.clearToast()
      }, 4000);
      appStore.appState = 'ready';
      return Promise.reject();
    }
  }

  const createUser = async (payload) => {
    appStore.appState = 'loading';
    try {
      const response = await axios.post(`${baseUrl}/users`, payload)
      appStore.setToast({
        message: 'Berhasil memuat data',
        type: 'alert-success'
      })
      setTimeout(() => {
        appStore.clearToast()
      }, 4000);
      appStore.appState = 'ready';
      return Promise.resolve(response);
    } catch (error) {
      appStore.setToast({
        message: error.response.data.error,
        type: 'alert-error'
      })
      setTimeout(() => {
        appStore.clearToast()
      }, 4000);
      appStore.appState = 'ready';
      return Promise.reject();
    }
  }
  return {
    listUser,
    getListUser,
    pagination,
    createUser,
    deleteUser,
  }
})