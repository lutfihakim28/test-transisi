import axios from "axios";
import { defineStore } from "pinia";
import { useAppStore } from "./appStore";

export const useAuthStore = defineStore('auth', () => {
  const appStore = useAppStore();
  const baseUrl = appStore.baseUrl;

  const login = async (data) => {
    appStore.appState = 'loading';
    try {
      const response = await axios.post(`${baseUrl}/login`, data);
      localStorage.setItem('transisi-token', response.data.token);
      appStore.setToast({
        message: 'Berhasil masuk',
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
      }, 4000)
      appStore.appState = 'ready';
      return Promise.reject(error);
    }
  };

  const register = async (data) => {
    appStore.appState = 'loading';
    try {
      const response = await axios.post(`${baseUrl}/register`, data);
      appStore.setToast({
        message: 'Berhasil daftar',
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
      return Promise.reject(error);
    }
  }
  return {
    login,
    register,
  }
})