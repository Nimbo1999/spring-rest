import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectUserAuthenticated } from '../../redux/userReducer/user.selector'
import { FazerLogof } from '../../redux/userReducer/user.action'

const { Header } = Layout

const HeaderApp = ({ isAuthenticated, match, FazerLogof }) => {
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
            <Menu.Item key='/logout' onClick={() => FazerLogof()}>
              Logout
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

const mapDispatchToProps = dispatch => ({
  FazerLogof: () => dispatch(FazerLogof())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderApp));