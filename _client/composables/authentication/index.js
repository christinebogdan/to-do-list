import Keycloak from "keycloak-js";
import { initSessionStore } from "~~/store/sessionStore";

export const initAuth = async () => {
  try {
    let initOptions = {
      url: "http://127.0.0.1:8080/auth",
      realm: "to-do-list",
      clientId: "to-do-list",
      onLoad: "login-required",
    };

    const keycloak = new Keycloak(initOptions);
    const isAuthenticated = await keycloak.init({
      onLoad: "login-required",
    });
    if (isAuthenticated) {
      initSessionStore().setSession(keycloak);
    } else {
      window.location.reload();
    }
    setInterval(async () => {
      try {
        const refreshed = await keycloak.updateToken(70);
        if (refreshed) {
          console.log("Token refreshed" + refreshed);
        }
      } catch (e) {
        console.log(e);
        console.log("Failed to refresh token");
      }
    }, 6000);
  } catch (e) {
    console.log(e);
    window.location.reload();
  }
};

/**
 * 
 *         // else {
        //   console.log(
        //     "Token not refreshed, valid for " +
        //       Math.round(
        //         keycloak.tokenParsed.exp +
        //           keycloak.timeSkew -
        //           new Date().getTime() / 1000,
        //       ) +
        //       " seconds",
        //   );
        // }
 */

/**
 * 
 * import Keycloak from "keycloak-js";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { initSessionStore } from "@/store";

export const keycloakReachable = async (): Promise<boolean> => {
  try {
    await axios.get("/login/health", { timeout: 1000 });
    return true;
  } catch (e) {
    if ((e as AxiosError).response?.status === 400) {
      return true;
    }
  }
  return false;
};

export const initAuth = async () => {
  const sessionStore = initSessionStore();
  if (sessionStore.currentSession) {
    return;
  }
  const keycloakUrl = import.meta.env.DEV
    ? "https://admin.test.moonsphere.eu/login"
    : "/login";
  // This should only run once during whole SPA lifecycle
  const keycloak = new Keycloak({
    url: keycloakUrl,
    realm: "moonsphere",
    clientId: "admin-ui",
  });
  await new Promise<void>((resolve) => {
    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: !import.meta.env.DEV,
      })
      .then((auth) => {
        if (!auth) {
          window.location.reload();
        } else {
          sessionStore.setSession(keycloak);
          axios.defaults.headers.common.Authorization =
            "Bearer " + keycloak.token;
        }
        setInterval(() => {
          keycloak
            .updateToken(70)
            .then((refreshed) => {
              if (refreshed) {
                axios.defaults.headers.common.Authorization =
                  "Bearer " + keycloak.token;
              }
            })
            .catch(() => {
              sessionStore.logout();
            });
        }, 6000);
        resolve();
      })
      .catch(() => {
        window.location.reload();
      });
  });
};

 */
