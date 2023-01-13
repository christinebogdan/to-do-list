import { defineStore } from "pinia";
// import Keycloak, { KeycloakTokenParsed } from "keycloak-js";

export const initSessionStore = defineStore("sessionStore", {
  state: () => {
    return {
      session: {},
    };
  },
  getters: {
    // gets authentication status
    isAuthenticated: (state) => {
      return state.session.authenticated;
    },
    currentSession: (state) => {
      console.log(state.session.idTokenParsed);
      console.log(state.session);
      return state.session.idTokenParsed;
    },
  },
  actions: {
    // sets keycloak as new session
    setSession(keycloak) {
      this.session = keycloak;
    },
    // logout of session via keycloak
    sessionLogout() {
      this.session?.logout();
    },
  },
});

/**
 * 
 * https://github.com/keycloak/keycloak-documentation/blob/main/securing_apps/topics/oidc/javascript-adapter.adoc
 * 
Implicit and hybrid flow
By default, the JavaScript adapter uses the Authorization Code flow.

With this flow the {project_name} server returns an authorization code, not an authentication token, to the application. 
The JavaScript adapter exchanges the code for an access token and a refresh token after the browser is redirected back to the application.

{project_name} also supports the Implicit flow where an access token is sent immediately after successful authentication with {project_name}. 
This may have better performance than standard flow, as there is no additional request to exchange the code for tokens, but it has 
implications when the access token expires.

However, sending the access token in the URL fragment can be a security vulnerability. For example the token could be leaked 
through web server logs and or browser history.

To enable implicit flow, you need to enable the Implicit Flow Enabled flag for the client in the {project_name} Admin Console. 
You also need to pass the parameter flow with value implicit to init method:
 */

// https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow > Flow Chart
