// import ls from 'local-storage';
import store from '@/store';

export const globalGuard = async (
  { name: nameTo, matched, fullPath },
  { name },
  next
) => {
  const notRedirect = ['Login'];
  const isStart = !name;
  const requiresAuth = matched.some(({ meta }) => meta.requiresAuth);
  const requiresAdmin = matched.some(({ meta }) => meta.requiresAdmin);
  console.log(
    'globalGuard: before fetch',
    store.getters['user/user'],
    isStart,
    requiresAuth,
    requiresAdmin
  );
  // await store.dispatch('app/setSidebarState', false);
  if (isStart) {
    try {
      await store.dispatch('app/init');
      console.log('globalGuard: after fetch', store.getters['user/user']);
    } catch (e) {
      console.log('isStart ERROR', e);
      if (notRedirect.includes(nameTo)) {
        next();
      } else {
        next({
          path: '/login',
          query: {
            redirect: fullPath
          }
        });
      }
    } finally {
      console.log('globalGuard: finally');
      await store.dispatch('app/setLoading', false);
    }
  }

  const user = store.getters['user/user'];

  if (user) {
    console.log('User');
    // if (requiresAuth && requiresAdmin) {
    //   next();
    // }
    next();
  } else {
    console.log('No user');
    console.log(fullPath);
    // next({
    //   path: '/login',
    //   query: {
    //     redirect: fullPath
    //   }
    // });
  }
  // if (requiresAuth && requiresAdmin) {
  //   next();
  // }
  // await store.dispatch('app/setLoading', false);
  // next();

  // if (to.matched.some(route => route.meta.requiresAuth)) {
  //   if (!isLoggedIn()) {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
};

export const authGuard = (to, from, next) => {
  const user = store.getters['user/user'];
  console.log('authGuard', user);
  if (user) {
    next({
      path: '/'
    });
  } else {
    next();
  }
};

export const tokenGuard = ({ query }, { name }, next) => {
  // TODO: need to check user isConfirmed and
  if (query.token && !name) {
    next();
  } else {
    next({
      path: '/'
    });
  }
};

export const adminGuard = (to, from, next) => {
  const user = store.getters['user/user'];
  console.log('adminGuard', user);
  next();
  // if (isLoggedIn()) {
  //   next({
  //     path: '/'
  //   });
  // } else {
  //   next();
  // }
};

// function isLoggedIn() {
//   const token = ls.get(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token');
//   return store.getters['user/loggedId'] || token;
// }
