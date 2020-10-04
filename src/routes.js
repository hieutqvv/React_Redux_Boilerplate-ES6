import AdminLayout from './container/Layouts/AdminLayout';
import Logout from './components/Auth/Logout';
import TodoList from './components/Views/Todo/TodoList';

const routes = [
  {path: '/', name: 'Home', component: AdminLayout, exact: true},
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/todo', name: 'Todo', component: TodoList },
];

export default routes;
