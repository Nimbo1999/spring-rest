import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectUserAuthenticated } from '../../redux/userReducer/user.selector'

const { Header } = Layout

const HeaderApp = ({ isAuthenticated, match }) => {
  const { path } = match

  const [ menuKey, setMenuKey ] = useState(['/'])

  return (
    <Header style={{backgroundColor: '#FFFFFF'}}>
      <Menu theme='light' mode='horizontal' defaultSelectedKeys={[path]} selectedKeys={menuKey} onSelect={(item) => {
        const { selectedKeys } = item
        if(isAuthenticated) setMenuKey(selectedKeys)
      }}>
        <Menu.Item key='/'>
          <Link to='/'>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key='/usuarios'>
          <Link to='/usuarios'>
            Usuarios
          </Link>
        </Menu.Item>
        {
          isAuthenticated ?
            <Menu.Item key='/logout' disabled>
              <Link to='/logout'>
                Logout
              </Link>
            </Menu.Item>
          :
          null
        }
      </Menu>
    </Header>
  )
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectUserAuthenticated
})

export default withRouter(connect(mapStateToProps)(HeaderApp));