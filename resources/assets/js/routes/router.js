import VueRouter from 'vue-router';

import {
    Welcome,
    User,
    NotFound
} from "./external-import/external-files";

import WelcomeToolbar from '../components/layouts/WelcomeToolbar';
import ErrorToolbar from '../components/error-pages/ErrorToolbar';
import UserToolbar from '../components/layouts/UserToolbar';

const router =  new VueRouter({
    routes: [
        {
            path: '/',
            name: 'welcome',
            components: {
                default: Welcome,
                'top-menu': WelcomeToolbar
            }
        },
        {
            path: '/user',
            name: 'user',
            components: {
                default: User,
                'top-menu': UserToolbar
            },
            beforeEnter: (to, from, next) => {
                router.app.$axios({
                    method: 'get',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    url: router.app.$master.api('/oauth/check')
                }).then((response) => {
                    next();
                }).catch((e) => {
                    next({
                        name: 'welcome'
                    });
                });
            }
        },
        {
            path: '/error-404',
            name: 'e404',
            components: {
                default: NotFound,
                'top-menu': ErrorToolbar
            }
        },
        {
            path: '*',
            redirect: 'e404'
        }
    ],
    mode: 'history',
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    // Some validations
    next();
});

export { router };