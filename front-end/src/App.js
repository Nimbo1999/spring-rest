import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Select, notification } from 'antd'
import './App.css';

// Funçâo para formatar os números
function telefonesFormater(telefones) {
  const TELEFONES = [];
  telefones.map(telefone => TELEFONES.push({numero: telefone}))
  return TELEFONES
}

// Component React
function App() {

  const [ usuarios, setUsuarios ] = useState();
  const [ localState, setLocalState ] = useState({
    addTrigger: false,
    usuario: {
      nome: '',
      login: '',
      senha: '',
      telefones: [],
    },
  });

  // Função para fazer o POST
  async function salvarUsuario(setLocale) {
    const body = {
      nome: localState.usuario.nome,
      login: localState.usuario.login,
      senha: localState.usuario.senha,
      telefones: telefonesFormater(localState.usuario.telefones)
    }
    await fetch('http://localhost:8080/curso-api/usuario/', {body: JSON.stringify(body), method: 'post', headers: new Headers({'Content-Type': 'application/json'})})
    .then(resp => resp.json())
    .then(data => {
      const { status, message } = data
      switch (status) {
        case 400:
          notification.error({message: 'Falha na Request', description: message})
          break;
          
          default:
          notification.success({message: 'Sucesso!', description: `Usuario ${data.nome} incluido com sucesso.`})
          setUsuarios([...usuarios, data])
          setLocale({...localState, addTrigger: false})
          break;
      }
      console.log(data)
    })
  }

  async function deletarUser(id) {
    await fetch(`http://localhost:8080/curso-api/usuario/${id}`, { method: 'delete' })
    .then(resp => resp.json())
    .then(data => notification.success({message: data.resp}))
  }


  useEffect(() => {
    fetch('http://localhost:8080/curso-api/usuario/', {mode: 'cors', method: 'GET'})
    .then(resp => resp.json())
    .then(data => {console.log(data);setUsuarios(data)})
  }, []);

  return (
    <div className="App">
      <div className='header-space'>
        <h2>Usuários</h2>
      </div>
      <div className='section-table'>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Login</th>
              <th>Telefone(s)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios !== undefined ?
                usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.login}</td>
                    <td>
                      {
                        usuario.telefones.length > 0 ?
                        usuario.telefones.map(
                          (telefone, i) => 
                            usuario.telefones.length === i + 1 ?
                            <span key={telefone.id}>{telefone.numero}</span> :
                            <span key={telefone.id}>{telefone.numero} , </span>
                        )
                        :
                        <p>Não possui</p>
                      }
                    </td>
                    <td>
                      <Button size='small' danger onClick={() => deletarUser(usuario.id)}>
                        Deletar
                      </Button>
                    </td>
                  </tr>
                ))
                :
                <tr>
                  <td colSpan='3' className='spinner-container'>
                    <span className='spin'>Carregando...</span>
                  </td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0px', backgroundColor: 'rgb(224, 224, 222)' }}>
        <Row style={{ width: '100%', maxWidth: '1200px'}}>
        {
          localState.addTrigger ?
          <>
            <Col xs={24}>
              <Form layout='vertical'>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label='Nome:'>
                      <Input
                        value={localState.usuario.nome}
                        onChange={e => setLocalState({...localState, usuario: {...localState.usuario, nome: e.target.value }})}
                        type='text'
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label='Login:'>
                      <Input
                        value={localState.usuario.login}
                        onChange={e => setLocalState({...localState, usuario: {...localState.usuario, login: e.target.value }})}
                        type='text'
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label='Senha:'>
                      <Input
                        value={localState.usuario.senha}
                        onChange={e => setLocalState({...localState, usuario: {...localState.usuario, senha: e.target.value }})}
                        type='password'
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label='Telefone(s):'>
                      <Select
                        mode='tags'
                        onChange={e => setLocalState({...localState, usuario: {...localState.usuario, telefones: e }})}
                        value={localState.usuario.telefones}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs={12}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
                <Button type='default' size='large' onClick={() => setLocalState({...localState, addTrigger: false})}>
                  Voltar
                </Button>
              </div>
            </Col>
            <Col xs={12}>
              <div style={{paddingLeft: '10px'}}>
                <Button type='primary' size='large' onClick={async () => {
                  await salvarUsuario(setLocalState)
                  }}>
                  Confirmar
                </Button>
              </div>
            </Col>
          </>
          :
            <Col xs={24}>
              <Button type='primary' size='large' onClick={() => setLocalState({...localState, addTrigger: true})}>
                Adicionar Usuário
              </Button>
            </Col>
        }
        </Row>
      </div>
    </div>
  );
}

export default App;
