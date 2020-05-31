import { notification } from 'antd'

export const handleChange = (item, type) => ({
  type,
  payload: item
})

// Funçâo para formatar os números
function telefonesFormater(telefones) {
  const TELEFONES = [];
  telefones.map(telefone => TELEFONES.push({numero: telefone}))
  return TELEFONES
}

// Salvar Usuario
export const salvarUsuario = (setLocale, usuario) => async (dispatch, getState) => {
  const { usuarios } = getState()
  const body = {
    nome: usuario.nome,
    login: usuario.login,
    senha: usuario.senha,
    telefones: telefonesFormater(usuario.telefones)
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
  const { usuarios } = getState()
  await fetch(`http://localhost:8080/curso-api/usuario/${id}`, { method: 'delete' })
  .then(resp => resp.json())
  .then(data => {
    notification.success({message: data.resp})
    const user = usuarios.filter(user => user.id !== id)
    dispatch(handleChange(user, 'FETCH_USUARIOS_USUARIOS'))
  })
}