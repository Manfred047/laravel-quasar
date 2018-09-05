import { es_welcome } from "./es-welcome";
import { es_register } from "./es-register";
import { es_login } from "./es-login";
import { es_errors } from "./es-errors";

const es = {
    "welcome": es_welcome,
    "register": es_register,
    "login": es_login,
    "error": es_errors
};

export {
    es,
    es_welcome,
    es_register,
    es_login
};

export default es;