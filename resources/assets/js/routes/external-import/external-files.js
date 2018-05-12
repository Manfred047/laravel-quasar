const Welcome = () => import('../../components/public/Welcome');
const User = () => import('../../components/auth/user/User');
const NotFound = () => import('../../components/error-pages/NotFound');

export {
    Welcome,
    User,
    NotFound
};