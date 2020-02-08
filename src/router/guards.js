import ls from "local-storage";
import store from "@/store";

export const globalGuard = (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

export const authGuard = (to, from, next) => {
  if (isLoggedIn()) {
    next({
      path: "/"
    });
  } else {
    next();
  }
};

function isLoggedIn() {
	const token = ls.get(process.env.VUE_APP_LOCALSTORAGE_KEY + ".token");
	return store.getters["user/loggedId"] || token
};

