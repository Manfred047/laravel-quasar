import VueRouter from 'vue-router';
import { AuthManager } from './auth-manager';

import * as All from "./external-import/external-files";

const router =  new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                default: All.PublicLayout,
                'top-menu': All.WelcomeToolbar,
                'app-footer': All.AppFooter
            },
            children: [
                {
                    path: '/',
                    name: 'public.index',
                    component: All.Welcome
                }
            ],
            beforeEnter (to, from, next) {
                AuthManager.optionalAuth(to, from, next);
            }
        },
        {
            path: '/user',
            components: {
                default: All.UserLayout,
                'top-menu': All.UserToolbar,
                'app-footer': All.AppFooter
            },
            children: [
                {
                    path: '/',
                    name: 'user.index',
                    component: All.User
                }
            ],
            beforeEnter (to, from, next) {
                AuthManager.forceAuth(to, from, next);
            }
        },
        {
            path: '/e404',
            components: {
                default: All.ErrorLayout,
                'top-menu': All.ErrorToolbar,
                'app-footer': All.AppFooter
            },
            children: [
                {
                    path: '/',
                    name: 'e404',
                    component: All.NotFound
                }
            ],
            beforeEnter (to, from, next) {
                AuthManager.optionalAuth(to, from, next);
            }
        },
        {
            path: '*',
            redirect: {
                name: 'e404'
            }
        }
    ],
    mode: 'history',
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    if (typeof router.app.$root.$master.self === 'undefined') {
        router.app.$root.$master.self = router.app.$root;
        router.app.$root.$master._setAxiosDefault();
    }
    next();
});

export { router };
