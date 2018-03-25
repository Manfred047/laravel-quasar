const Welcome = resolve => {
    require.ensure(['../../components/public/Welcome'], () => {
        resolve(require('../../components/public/Welcome'));
    }, 'js/public');
};

const User = resolve => {
    require.ensure(['../../components/auth/user/User'], () => {
        resolve(require('../../components/auth/user/User'));
    }, 'js/user');
};

const NotFound = resolve => {
    require.ensure(['../../components/error-pages/NotFound'], () => {
        resolve(require('../../components/error-pages/NotFound'));
    }, 'js/auth');
};

export {
    Welcome,
    User,
    NotFound
};