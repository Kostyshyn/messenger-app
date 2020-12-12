import store from '@/store';

export const globalGuard = async ({ query }, { name: nameFrom }, next) => {
  const loggedIn = store.getters['user/loggedIn'];
  const isStart = !nameFrom;
  const { popup } = query;
  if (isStart && !loggedIn) {
    try {
      await store.dispatch('app/init');
    } catch (e) {
      // TODO: check this
    } finally {
      await store.dispatch('app/setLoading', false);
    }
  }
  next();
  await store.dispatch('app/setSidebarState', false);
  if (popup) {
    const { name } = store.getters['popup/popup'];
    if (popup !== name) {
      await store.dispatch('popup/openPopup', { type: popup });
    }
  } else {
    await store.dispatch('popup/closePopup');
  }
};

export const pageGuard = (to, from, next) => {
  const loggedIn = store.getters['user/loggedIn'];
  if (loggedIn) {
    next();
  } else {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    });
  }
};

export const authGuard = (to, from, next) => {
  const loggedIn = store.getters['user/loggedIn'];
  if (loggedIn) {
    next({
      path: '/'
    });
  } else {
    next();
  }
};

export const tokenGuard = ({ query }, { name }, next) => {
  const user = store.getters['user/user'];
  // TODO: need to check user isConfirmed and
  if (query.token && !name) {
    next();
  } else if (user) {
    next({
      path: '/'
    });
  } else {
    next({
      path: '/login'
    });
  }
};

export const adminGuard = (to, from, next) => {
  const loggedIn = store.getters['user/loggedIn'];
  const isAdmin = store.getters['user/isAdmin'];
  if (loggedIn && isAdmin) {
    next();
  } else if (loggedIn) {
    next({
      path: '/'
    });
  } else {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    });
  }
};
