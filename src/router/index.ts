import { createRouter, createWebHistory } from 'vue-router'
import { UserStore } from '@/util/UserStore';

const ifAuthorized = (roles: string[]) => async (to, from, next) => {
  const userRoles = UserStore.getRoles();

  // Vérifiez si l'utilisateur possède au moins un des rôles requis
  const hasAccess = roles.some(role => userRoles.includes(role));

  if (hasAccess) {
    next();
  } else {
    next('/');
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/evenement/AllEvenement.vue'),
    },
    {
      path: '/addEvenement',
      name: 'addEvenement',
      beforeEnter: ifAuthorized(['ROLE_ORGANISATEUR']),
      component: () => import('@/views/evenement/AddEvenement.vue'),
    },
    {
      path: '/filteredEvenement',
      name: 'filteredEvenement',
      component: () => import('@/views/evenement/FilteredEvenements.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/LoginUser.vue'),
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('@/views/user/SignUp.vue'),
    },
    {
      path: '/user/:id',
      name: 'userProfil',
      component: () => import('@/views/user/UserProfil.vue'),
    },
    {
      path: '/club',
      name: 'allClub',
      component: () => import('@/views/club/AllClub.vue'),
    },
    {
      path: '/addClub',
      name: 'addClub',
      beforeEnter: ifAuthorized(['ROLE_COACH']),
      component: () => import('@/views/club/AddClub.vue'),
    },
    {
      path: '/myClub',
      name: 'myClub',
      beforeEnter: ifAuthorized(['ROLE_COACH']),
      component: () => import('@/views/club/MyClub.vue'),
    },
    {
      path: '/club/:id/equipes',
      name: 'equipeClub',
      component: () => import('@/views/equipe/AllEquipe.vue'),
    },
    {
      path: '/addEquipe',
      name: 'addEquipe',
      beforeEnter: ifAuthorized(['ROLE_COACH']),
      component: () => import('@/views/equipe/AddEquipe.vue'),
    },
    {
      path: '/allUser',
      name: 'allUser',
      beforeEnter: ifAuthorized(['ROLE_ADMIN']),
      component: () => import('@/views/user/AllUser.vue'),
    },
    {
      path: '/updateProfil',
      name: 'updateProfil',
      beforeEnter: ifAuthorized(['ROLE_USER']),
      component: () => import('@/views/user/UpdateProfil.vue'),
    },
  ],
})

export default router
