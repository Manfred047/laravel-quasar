const master = {
    props: {
        self: {
            required: true
        }
    },
    url(url = '') {
        return MASTER_APP['BASE_URL'] + url;
    },
    api(url = '') {
        return MASTER_APP['API_URL'] + url;
    },
    recaptcha() {
        return MASTER_APP['RECAPTCHA'];
    },
    /**
     *
     * @param {function} fn - Function
     * @param {int} time - Time interval
     */
    Timer(fn, time) {
        let timerObj = setInterval(fn, time);

        this.stop = () => {
            if (timerObj) {
                clearInterval(timerObj);
                timerObj = null;
            }
            return this;
        };

        // start timer using current settings (if it's not already running)
        this.start = () => {
            if (!timerObj) {
                this.stop();
                timerObj = setInterval(fn, time);
            }
            return this;
        };

        // start with new interval, stop current interval
        this.reset = (newT) => {
            time = newT;
            return this.stop().start();
        }
    },
    _setMomentDefault() {
        this.self.$moment.locale('en');
    },
    _setAxiosDefault() {
        let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
        this.self.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        if (token !== '') {
            this.self.$axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        }
        this.self.$axios.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            // Additional conditions
            return Promise.reject(error);
        });
        this.self.$axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 422:
                        // Returns response error data
                        // example: email: The email field is required
                        return Promise.reject(error.response.data);
                        break;

                    case 404:
                        this.self.$q.notify({
                            message: 'Resource not found',
                            type: 'negative'
                        });
                        break;

                    case 403:
                        this.self.$q.notify({
                            message: 'Unauthorized action',
                            type: 'negative'
                        });
                        break;

                    case 419:
                        this.self.$q.notify({
                            message: 'Invalid or expired security context token',
                            type: 'negative'
                        });
                        break;

                    case 500:
                        this.self.$q.notify({
                            message: 'Internal Server Error',
                            type: 'negative'
                        });
                        break;

                    case 401:
                        if (this.self.$store.state.auth.auth) {
                            this.self.$q.notify({
                                message: 'Expire session',
                                type: 'warning'
                            });
                        }
                        break;

                    default:
                        this.self.$q.notify({
                            message: 'An unexpected error has occurred',
                            type: 'negative'
                        });
                        break;
                }
            } else {
                this.self.$q.notify({
                    message: 'An unexpected error has occurred',
                    type: 'negative'
                });
            }
            return Promise.reject();
        });
    }
};

export { master };