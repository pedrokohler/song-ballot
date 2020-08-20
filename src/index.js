import '@appnest/web-router';

customElements.whenDefined('router-slot').then(async () => {
  const routerSlot = document.querySelector('router-slot');
  window.routerSlot = routerSlot;
  await routerSlot.add([
    {
      path: 'menu',
      component: () => import('./pages/menu-page'),
    },
    {
      path: '',
      component: () => import('./pages/login-page'),
    },
    {
      path: '**',
      redirectTo: 'menu',
    },
  ]);
});
