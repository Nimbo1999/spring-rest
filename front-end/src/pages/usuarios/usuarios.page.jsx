import React, { useState, useEffect } from 'react'
// AntDesign
import { Row, Col, Button, Card, Form, Input, notification, Select } from 'antd'
// Components
import { TabelaUsuarios } from '../../components'
// Redux
import { connect } from 'react-redux'
import { salvarUsuario, alterarUser } from '../../redux/usuariosReducer/usuarios-action'
import { handleChange } from '../../redux/actions'

// Route: /usuarios
const UsuariosPage = ({ handleChange, salvarUsuario, alterarUser }) => {

  useEffect(() => {
    fetch('http://localhost:8080/curso-api/usuario', { mode: 'cors', method: 'GET' })
      .then(resp => resp.json())
      .then(data => handleChange(data, 'FETCH_USUARIOS_USUARIOS'))
      .catch(e => notification.error({ message: 'Servidor offline', description: 'O servidor para o qual buscamos os dados está temporariamento fechado.' }))
  }, [handleChange]);

  const [localState, setLocalState] = useState({
    addTrigger: false,
    usuario: {
      nome: '',
      login: '',
      senha: '',
      telefones: [],
    },
  });

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
  );

  return (
    <>
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
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  handleChange: (item, type) => dispatch(handleChange(item, type)),
  salvarUsuario: (setLocale, usuario) => dispatch(salvarUsuario(setLocale, usuario)),
  alterarUser: usuario => dispatch(alterarUser(usuario))
})

export default connect(null, mapDispatchToProps)(UsuariosPage)