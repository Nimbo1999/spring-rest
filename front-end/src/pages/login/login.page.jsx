import React from 'react';
// Ant Design
import { Row, Col, Form, Input, Card, Button } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectUserLoading } from '../../redux/userReducer/user.selector'
import { FazerLogin } from '../../redux/userReducer/user.action'
import { handleChange } from '../../redux/actions'
import '../../App.css'
import './login.css'

const LoginPage = ({ handleChange, loading, FazerLogin, history }) => {
  return (
    <div className='content-centered pt-2'>
      <Card title='Faça login no sistema' style={{ width: '100%'}}>
        <Form layout='vertical'>
          <Row>
            <Col xs={24}>
              <Form.Item label='Usename' extra='Informe o seu usuário do sistema'>
                <Input
                  type='text'
                  onChange={e => {
                    handleChange(e.target.value, 'USER_SET_USERNAME')
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label='Senha' extra='Informe sua senha no sistema'>
                <Input
                  type='password'
                  onChange={e => {
                    handleChange(e.target.value, 'USER_SET_PASSWORD')
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Button onClick={() => FazerLogin(history)} shape='round' type='primary' size='large' disabled={loading}>
                Conectar<Loading3QuartersOutlined spin style={{ fontSize: '14px' }} className={`spin-loading ${loading}`} />
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: selectUserLoading
})

const mapDispatchToProps = dispatch => ({
  handleChange: (item, type) => dispatch(handleChange(item, type)),
  FazerLogin: history => dispatch(FazerLogin(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);