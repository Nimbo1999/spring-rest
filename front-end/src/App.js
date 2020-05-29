import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [ usuarios, setUsuarios ] = useState();
  const [ localState, setLocalState ] = useState({addTrigger: false});

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
                            <p key={telefone.id}>{telefone.numero}</p> :
                            <p key={telefone.id}>{telefone.numero} - </p>
                        )
                        :
                        <p>Não possui</p>
                      }
                      </td>
                  </tr>
                ))
                :
                null
            }
          </tbody>
        </table>
      </div>
      {
        localState.addTrigger ?
        <div className='section-add-usuario'>
          <div className='add-user-container'>
            <div className='input-group'>
              <label htmlFor='input-nome'>Nome: </label>
              <input type='text' id='input-nome' />
            </div>
            <div className='input-group'>
              <label htmlFor='input-login'>Login: </label>
              <input type='text' id='input-login' />
            </div>
            <div className='input-group'>
              <label htmlFor='input-senha'>Senha: </label>
              <input type='password' id='input-senha' />
            </div>
            <div className='input-group'>
              <label htmlFor='input-telefone'>Telefone(s): </label>
              <input type='text' id='input-telefone' />
            </div>
          </div>
        </div>
        :
        null
      }
      {
        !localState.addTrigger ?
        <div className='section-add-usuario'>
          <div className='add-user-container'>
            <button className='button-primary' onClick={() => setLocalState({addTrigger: true})}>
              Adicionar Usuário
            </button>
          </div>
        </div>
        :
        <div className='section-add-usuario'>
          <div className='add-user-container'>
            <button className='button-primary' onClick={() => setLocalState({addTrigger: false})}>
              Voltar
            </button>
            <button className='button-primary' onClick={() => {
              setLocalState({addTrigger: false})
              }}>
              Confirmar
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
