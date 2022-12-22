import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAppStore = defineStore('app', () => {
  /** @type {Toast} */
  const toast = reactive({
    message: '',
    type: 'alert-success',
  });

  /** @type {'loading' | 'ready'} */
  const appState = ref('ready')

  const baseUrl = 'https://reqres.in/api';

  /**
   * @param {Toast} snackData 
   */
  const setToast = (snackData) => {
    toast.message = snackData.message;
    toast.type = snackData.type;
  };

  const clearToast = () => {
    toast.message = '';
  };

  return {
    appState,
    baseUrl,
    toast,
    setToast,
    clearToast,
  }
})

/**
 * @typedef {object} Toast
 * @property {string} message
 * @property {'alert-success' | 'alert-error'} type
 */