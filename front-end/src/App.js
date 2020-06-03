import React from 'react';
import { Layout, Breadcrumb } from 'antd'
import { Switch, Route } from 'react-router-dom'
import { Routes } from './router'
// Components
import { Header } from './components'
// Redux
import { connect } from 'react-redux'
import { selectUserAuthenticated } from './redux/userReducer/user.selector'
import { createStructuredSelector } from 'reselect'

import './App.css';

const { Content } = Layout

// Component React
function App({ userAuthenticated }) {

  return (
    <Layout className="App">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0px', padding: '0px 40px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        </Breadcrumb>
        <div className='content'>
          <Switch>
            {
              Routes(userAuthenticated).map((route, i) => <Route key={i} {...route} />)
            }
          </Switch>
        </div>
      </Content>
    </Layout>
  );
}

const mapStateToProps = createStructuredSelector({
  userAuthenticated: selectUserAuthenticated
})

export default connect(mapStateToProps)(App);
