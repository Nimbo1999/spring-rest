import React from 'react'
import { Layout, Menu } from 'antd'

const { Header } = Layout

export default () => {
  return (
    <Header style={{backgroundColor: '#FFFFFF'}}>
      <Menu theme='light' mode='horizontal' defaultSelectedKeys={['0']}>
        <Menu.Item key='0'>Usuarios</Menu.Item>
        <Menu.Item key='1' disabled>Telefones</Menu.Item>
      </Menu>
    </Header>
  )
}