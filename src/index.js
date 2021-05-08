import "@appnest/web-router";
import { store } from "./store";

function sessionGuard() {
  if (!store.currentUser) {
    window.history.replaceState(null, "", "");
    return false;
  }
  return true;
}

customElements.whenDefined("router-slot").then(async () => {
  const routerSlot = document.querySelector("router-slot");
  await routerSlot.add([
    {
      path: "menu",
      component: () => import("./pages/menu-page"),
      guards: [sessionGuard],
    },
    {
      path: "send-song",
      component: () => import("./pages/send-song-page"),
      guards: [sessionGuard],
    },
    {
      path: "vote",
      component: () => import("./pages/vote-page"),
      guards: [sessionGuard],
    },
    {
      path: "results",
      component: () => import("./pages/results-page"),
      guards: [sessionGuard],
    },
    {
      path: "bot-settings",
      component: () => import("./pages/bot-settings-page"),
      guards: [sessionGuard],
    },
    {
      path: "logout",
      component: () => import("./pages/logout-page"),
      guards: [sessionGuard],
    },
    {
      path: "",
      component: () => import("./pages/login-page"),
    },
    {
      path: "**",
      redirectTo: "menu",
    },
  ]);
});
