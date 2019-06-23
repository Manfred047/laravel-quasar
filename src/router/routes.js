
const routes = [
  // Public routes
  {
    path: '/',
    component: () => import('layouts/public/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'public.index',
        component: () => import('pages/public/Index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/login',
        name: 'public.login',
        component: import('pages/public/Login.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/register',
        name: 'Register.login',
        component: import('pages/public/Register.vue'),
        meta: { requiresAuth: false }
      }
    ]
  },
  // Auth routes
  {
    path: '/',
    component: () => import('layouts/auth/AdminLayout.vue'),
    children: [
      {
        path: 'user',
        name: 'auth.user',
        component: () => import('pages/auth/User.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
