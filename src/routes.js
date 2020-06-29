import AdminLayout from './container/Layouts/AdminLayout';
import Logout from './components/Auth/Logout';

const routes = [
  {path: '/', name: 'Home', component: AdminLayout, exact: true},
  { path: '/logout', name: 'Logout', component: Logout },
];

export default routes;
