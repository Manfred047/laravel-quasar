const master = {
    props: {
        self: {
            required: true
        }
    },
    url(url = '/') {
        return `${this.getBaseUrl()}${url}`;
    },
    api(url = '/') {
        return `${this.getBaseApi()}${url}`;
    },
    getBaseUrl() {
        return MASTER_APP['BASE_URL'];
    },
    getBaseApi() {
        return MASTER_APP['API_URL'];
    },
    getRecaptcha() {
        return MASTER_APP['RECAPTCHA'];
    },
    getInfo(param) {
        return MASTER_APP[param];
    },
    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isEmpty(v) {
        return v === '';
    },
    isNull(v) {
        return v === null;
    },
    bin2hex(s) {
        let i;
        let l;
        let n;
        let o = '';
        s += '';
        for (i = 0, l = s.length; i < l; i++) {
            n = s.charCodeAt(i).toString(16);
            o += ((n.length < 2) ? '0' + n : n);
        }
        return o;
    },
    hex2bin(bin) {
        let ret = [];
        let i = 0;
        let l;
        bin +='';
        for (l = bin.length; i < l; i += 2) {
            let c = parseInt(bin.substr(i, 1), 16);
            let k = parseInt(bin.substr(i + 1, 1), 16);
            if (isNaN(c) || isNaN(k)) {
                return false;
            }
            ret.push((c << 4) | k);
        }
        return String.fromCharCode.apply(String, ret);
    },
    isEmptyObject(obj) {
        for(let key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },
    hasErrors(errors) {
        if (typeof errors === 'object') {
            let data = this.getValue(errors, ['response', 'data', 'errors']);
            if (data && this.getValue(errors, ['response', 'status']) === 422) {
                return data;
            }
        }
        return false;
    },
    getValue(object, path) {
        return path.reduce((xs, x) =>
            (xs && xs[x]) ? xs[x] : null, object);
    },
    rewriteObject(first, second) {
        if (second.length !== 0) {
            for (const [key, value] of Object.entries(second)) {
                if (first.hasOwnProperty(key)) {
                    first[key] = value;
                }
            }
        }
        return first;
    },
    /**
     * Formatea un numero determinado
     * @author Locutus (http://locutus.io)
     *
     * @param {float}  number - Numero sin formato
     * @param {string} [decimal=.] - Separador de decimales
     * @param {string} [thousand=,] - Separador de miles
     * @param {int} [fix=2] - Cantidad de decimales
     * @return {string}
     */
    numberFormat(number, decimal, thousand, fix) {
        let TheNumber = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        let n = ((!isFinite(+TheNumber)) ? 0 : +TheNumber);
        let prec = ((!isFinite(+fix)) ? 2 : Math.abs(fix));
        let sep = ((typeof thousand === 'undefined') ? ',' : thousand);
        let dec = ((typeof decimal === 'undefined') ? '.' : decimal);
        let s = '';
        let toFixedFix = function (n, prec) {
            let k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
        // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        let regex = RegExp('\\' + dec + '00', 'g');
        TheNumber = s.join(dec);
        return TheNumber.replace(regex, '');
    },
    ObjectNumberFormat(number, data) {
        return this.numberFormat(number, data.decimal, data.thousand, 2);
    },
    /**
     * Retorna un numero con simbolo de moneda
     *
     * @param number
     * @param data
     * @param format
     * @returns {string}
     */
    currency(number, data, format) {
        let currency = '$ 0';
        if (typeof format === 'undefined') {
            number = this.numberFormat(number, data.decimal, data.thousand, 2);
        }
        switch (data.position) {
            case 'left':
                currency = `${data.symbol} ${$number}`;
                break;
            case 'right':
                currency = `${$number} ${data.symbol}`;
                break;
            default:
                currency = `${data.symbol} ${$number}`;
                break;
        }
        return currency;
    },
    /**
     * Retorna un numero con sombolo ISO
     *
     * @param number
     * @param data
     * @param format
     * @returns {string}
     */
    currencyISO(number, data, format) {
        if (typeof format === 'undefined') {
            number = this.numberFormat(number, data.decimal, data.thousand, 2);
        }
        let iso = data.code;
        return `${iso} ${number}`;
    },
    /**
     * Funcion que retorna un numero con simbolo de procentaje
     *
     * @param number - Numero Sin formato
     * @param data - Datos de la moneda
     * @return {string}
     */
    percent(number, data) {
        return `${this.numberFormat(number, data.decimal, data.thousand, 2)}%`;
    },
    /**
     *
     * @param {function} fn - Funcion
     * @param {int} time - Intervalo de tiempo
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
    setRecaptchaLang (refs, language) {
        let element = refs.getElementsByTagName('iframe');
        if (element[0]) {
            let src = element[0].getAttribute('src');
            let lang = src.match(/hl=(.*?)&/).pop();
            if (lang !== language) {
                src = src.replace(/hl=(.*?)&/, `hl=${language}&`);
                element[0].setAttribute('src', src);
            }
        }
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
            // Se puede lanzar alerta de error inesperado
            return Promise.reject(error);
        });
        this.self.$axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response) {
                switch (error.response.status) {

                    case 422:
                        // form error
                        break;

                    case 404:
                        this.self.$q.notify({
                            message: this.self.$t('error.e404'),
                            type: 'negative'
                        });
                        break;

                    case 405:
                        this.self.$q.notify({
                            message: this.self.$t('error.e405'),
                            type: 'negative'
                        });
                        break;

                    case 403:
                        this.self.$q.notify({
                            message: this.self.$t('error.e403'),
                            type: 'negative'
                        });
                        break;

                    case 419:
                        this.self.$q.notify({
                            message: this.self.$t('error.e419'),
                            type: 'negative'
                        });
                        break;

                    case 500:
                        this.self.$q.notify({
                            message: this.self.$t('error.e500'),
                            type: 'negative'
                        });
                        break;

                    case 401:
                        if (this.self.$store.state.auth.auth) {
                            this.self.$q.notify({
                                message: this.self.$t('error.e401'),
                                type: 'warning'
                            });
                        }
                        break;

                    default:
                        this.self.$q.notify({
                            message: this.self.$t('error.eUnexpected'),
                            type: 'negative'
                        });
                        break;
                }
            } else {
                this.self.$q.notify({
                    message: this.self.$t('error.eUnexpected'),
                    type: 'negative'
                });
            }
            return Promise.reject(error);
        });
    }
};

export { master };