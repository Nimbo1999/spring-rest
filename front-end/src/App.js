import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Select, Layout, Breadcrumb, Card, notification } from 'antd'
// Redux
import { connect } from 'react-redux'
import { handleChange, salvarUsuario, alterarUser } from './redux/usuariosReducer/usuarios-action'
// Components
import { Header, TabelaUsuarios } from './components'
import './App.css';

const { Content } = Layout

// Component React
function App({ handleChange, salvarUsuario, alterarUser }) {

  const [localState, setLocalState] = useState({
    addTrigger: false,
    usuario: {
      nome: '',
      login: '',
      senha: '',
      telefones: [],
    },
  });

  useEffect(() => {
    fetch('http://localhost:8080/curso-api/usuario', { mode: 'cors', method: 'GET' })
      .then(resp => resp.json())
      .then(data => handleChange(data, 'FETCH_USUARIOS_USUARIOS'))
      .catch(e => notification.error({ message: 'Servidor offline', description: 'O servidor para o qual buscamos os dados está temporariamento fechado.' }))
  }, [handleChange]);

  const actions = (
    localState.usuario.id ?
      [
        <Button type='default' danger size='large' onClick={() => setLocalState({
          usuario: {
            nome: '',
            login: '',
            senha: '',
            telefones: [],
          },
          addTrigger: false
        })}>
          Cancelar
        </Button>,
        <Button type='primary' size='large' onClick={async () => {
          await alterarUser(localState.usuario)
          setLocalState({
            usuario: {
              nome: '',
              login: '',
              senha: '',
              telefones: [],
            },
            addTrigger: false
          })
        }}>
          Confirmar
        </Button>
      ]
      :
      [
        <Button type='default' danger size='large' onClick={() => setLocalState({
          usuario: {
            nome: '',
            login: '',
            senha: '',
            telefones: [],
          },
          addTrigger: false
        })}>
          Cancelar
        </Button>,
        <Button type='primary' size='large' onClick={async () => {
          await salvarUsuario(setLocalState, localState.usuario)
        }}>
          Confirmar
        </Button>
      ]
  )

  return (
    <Layout className="App">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0px', padding: '0px 40px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        </Breadcrumb>
        <div className='content'>
          {
            localState.addTrigger ?
              <div style={{ width: '100%', padding: '10px 40px' }}>
                <Card
                  title='Inserir novo Usuário'
                  actions={actions}
                >
                  <Form layout='vertical'>
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item label='Nome:'>
                          <Input
                            value={localState.usuario.nome}
                            onChange={e => setLocalState({ ...localState, usuario: { ...localState.usuario, nome: e.target.value } })}
                            type='text'
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label='Login:'>
                          <Input
                            value={localState.usuario.login}
                            onChange={e => setLocalState({ ...localState, usuario: { ...localState.usuario, login: e.target.value } })}
                            type='text'
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label='Senha:'>
                          <Input
                            value={localState.usuario.senha}
                            onChange={e => setLocalState({ ...localState, usuario: { ...localState.usuario, senha: e.target.value } })}
                            type='password'
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label='Telefone(s):'>
                          <Select
                            mode='tags'
                            onChange={e => setLocalState({ ...localState, usuario: { ...localState.usuario, telefones: e } })}
                            value={localState.usuario.telefones}
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </div>
              :
              null
          }
          <TabelaUsuarios setLocalState={setLocalState} localState={localState} />
        </div>
      </Content>
    </Layout>
  );
}

const mapDispatchToProps = dispatch => ({
  handleChange: (item, type) => dispatch(handleChange(item, type)),
  salvarUsuario: (setLocale, usuario) => dispatch(salvarUsuario(setLocale, usuario)),
  alterarUser: usuario => dispatch(alterarUser(usuario))
})

export default connect(null, mapDispatchToProps)(App);
