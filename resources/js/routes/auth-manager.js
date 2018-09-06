import { router } from './router';
export const AuthManager = {
    getAuth (details = 0) {
        return router.app.$axios({
            method: 'get',
            url: router.app.$master.api('/oauth/check'),
            params: {
                details: details
            }
        }).then((response) => {
            const auth = Boolean(response.data.auth);
            router.app.$store.dispatch('auth/setAuthStatus', auth);
            if (auth) {
                router.app.$store.dispatch('auth/setUserInfo', response.data.data);
            }
            router.app.$store.dispatch('auth/reloadAuthStatus');
        }).catch((error) => {
            router.app.$store.dispatch('auth/setAuthStatus', false);
            router.app.$store.dispatch('auth/reloadAuthStatus');
            throw 422;
        });
    },
    forceAuth (to, from, next) {
        this.getAuth(1).then((r) => {
            if (router.app.$store.state.auth.auth) {
                next();
            } else {
                router.app.$q.notify({
                    message: 'Se requiere inicio de sesion',
                    type: 'warning'
                });
                next({
                    name: 'public.index'
                });
            }
        }).catch((e) => {
            router.app.$q.notify({
                message: 'Se requiere inicio de sesion',
                type: 'warning'
            });
            next({
                name: 'public.index'
            });
        });
    },
    optionalAuth(to, from, next) {
        this.getAuth(1).then((r) => {
            next();
        }).catch((e) => {
            next();
        });
    }
};