import { notification } from 'antd'
import { handleChange } from '../actions'

// Funçâo para formatar os números
function telefonesFormater(telefones) {
  const TELEFONES = [];
  telefones.map(telefone => TELEFONES.push({numero: telefone}))
  return TELEFONES
}

// Salvar Usuario
export const salvarUsuario = (setLocale, usuario) => async (dispatch, getState) => {
  const { usuarios, user : { user: { token } } } = getState()
  const body = {
    nome: usuario.nome,
    login: usuario.login,
    senha: usuario.senha,
    telefones: telefonesFormater(usuario.telefones)
  }
  await fetch('http://localhost:8080/curso-api/usuario/', {body: JSON.stringify(body), method: 'post', headers: new Headers({
    'Content-Type': 'application/json',
    Authorization: token
  })})
  .then(resp => resp.json())
  .then(data => {
    const { status, message } = data
    switch (status) {
      case 400:
        notification.error({message: 'Falha na Request', description: message})
        break;
        
        default:
        notification.success({message: 'Sucesso!', description: `Usuario ${data.nome} incluido com sucesso.`})
        dispatch(handleChange([...usuarios, data], 'FETCH_USUARIOS_USUARIOS'));
        setLocale({
          usuario: {
            nome: '',
            login: '',
            senha: '',
            telefones: [],
          },
          addTrigger: false
        })
        break;
    }
  })
}

// Delete Usuario
export const deletarUser = id => async (dispatch, getState) => {
  const { usuarios, user: { user: { token } } } = getState()
  await fetch(`http://localhost:8080/curso-api/usuario/${id}`, { method: 'delete', headers: new Headers({Authorization: token}) })
  .then(resp => resp.json())
  .then(data => {
    notification.success({message: data.resp})
    const user = usuarios.filter(user => user.id !== id)
    dispatch(handleChange(user, 'FETCH_USUARIOS_USUARIOS'))
  })
}

// Alterar Usuario
export const alterarUser = usuario => async (dispatch, getState) => {
  const { usuarios, user: { user: { token } } } = getState()
  const body = {
    id: usuario.id,
    nome: usuario.nome,
    login: usuario.login,
    senha: usuario.senha,
    telefones: telefonesFormater(usuario.telefones)
  }
  await fetch('http://localhost:8080/curso-api/usuario', {body: JSON.stringify(body), method: 'put', headers: new Headers({
    'Content-Type': 'application/json',
    Authorization: token
  })})
  .then(resp => resp.json())
  .then(data => {
    notification.success({message: `Usuario ${data.nome} alterado com sucesso!`})
    usuario = usuarios.filter(user => user.id === usuario.id).shift()
    dispatch(handleChange(usuarios.map(user => user.id === usuario.id ? data : user), 'FETCH_USUARIOS_USUARIOS'))
  })
}