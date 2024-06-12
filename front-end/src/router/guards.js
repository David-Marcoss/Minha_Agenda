import store from '../store/index.js';

export function logout(to, from, next) {
    store.commit('user/clearAuth');
    next({ name: 'login' });
}

// Só tem acesso à rota se estiver autenticado
export function isAuthenticated(to, from, next) {
    if (store.state.user.authData.isAuthenticated) {
        next();
    } else {
        next({ name: 'login' });
    }
}

// Só tem acesso à rota se não estiver autenticado
export function isNotAuthenticated(to, from, next) {
    if (store.state.user.authData.isAuthenticated) {
        next({ name: 'dashboard' });
    } else {
        next();
    }
}
