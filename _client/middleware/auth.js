import { initSessionStore } from "@/store/sessionStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const sessionStore = initSessionStore();

  if (!sessionStore.isAuthenticated) console.log("not authenticated");

  await initAuth();
  if (sessionStore.isAuthenticated) console.log("authenticated");
  sessionStore.currentSession;
});

/**
 * import { initSessionStore } from "@/store";

export default defineNuxtRouteMiddleware(async (to) => {
  const sessionStore = initSessionStore();
  if (!sessionStore.isAuthenticated) {
    if (!(await keycloakReachable())) {
      if (to.path === "/retry") {
        return;
      }
      return navigateTo("retry");
    } else if (to.path === "/retry") {
      return navigateTo("/");
    }
  }
  await initAuth();

  if (to.path === "/") {
    return;
  }
  if (!sessionStore.isAuthenticated) {
    return navigateTo("/");
  }
});


 */
