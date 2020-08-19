import { Router } from '@vaadin/router';

import './pages/home-page';

const app = document.querySelector('#root');
const router = new Router(app);

router.setRoutes([
  // { path: '/', component: 'home-page' },
  { path: '/', component: 'login-page' },
  { path: '/menu', component: 'menu-page' },
]);
