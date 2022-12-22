import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import Home from '../pages/Home.vue';
import CreateUser from '../pages/CreateUser.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: true,
      }
    },
    {
      path: '/create',
      name: 'CreateUSer',
      component: CreateUser,
      meta: {
        auth: true,
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        auth: false,
      }
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,
      meta: {
        auth: false,
      }
    }
  ],
});

router.beforeEach(async (to, from) => {
  if (
    !localStorage.getItem('transisi-token') &&
    to.meta.auth
  ) {
    return { name: 'LoginPage' };
  }

  if (localStorage.getItem('transisi-token') &&
    !to.meta.auth) {
    return { name: from.name };
  }

  // if (!localStorage.getItem('transisi-token') && !to.meta.auth) {
  //   return { name: to.name }
  // }
});

export default router;