import React from 'react'
import { Redirect } from 'react-router-dom'
import { LoginPage, UsuariosPage } from './pages'

export const Routes = userAuthenticated => {
  return [
    {
      path: '/usuarios',
      render: () => {
        return userAuthenticated ? <UsuariosPage /> : <Redirect to='/' />
      }
    },
    {
      path: '/',
      component: LoginPage
    },
  ];
}