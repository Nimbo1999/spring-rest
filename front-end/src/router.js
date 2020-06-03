import { LoginPage, UsuariosPage } from './pages'

export const Routes = userAuthenticated => {
  return [
    {
      path: '/usuarios',
      render: props => {
        const { history } = props
        return userAuthenticated ? UsuariosPage : history.replace('/')
      }
    },
    {
      path: '/',
      component: LoginPage
    },
  ];
}