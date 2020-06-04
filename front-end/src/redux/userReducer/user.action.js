import { handleChange } from '../actions'
import { notification } from 'antd'

export const FazerLogin = history => async (dispatch, getState) => {
  const { user : {loading, user: { username, password } } } = getState()
  dispatch(handleChange(!loading, 'USER_REDUCER_LOADING'))
  const body = {
    login: username,
	  senha: password
  }
  await fetch('http://localhost:8080/curso-api/login',
  {body: JSON.stringify(body), method: 'post', mode: 'cors' })
  .then(resp => resp.json())
  .then(data => {
    switch (data.status) {
      case 403:{
        const { message } = data
        notification.error({ message })
        dispatch(handleChange(!loading, 'USER_REDUCER_LOADING'))
        break;
      }
    
      default:
        notification.success({message: 'logado com sucesso'})
        dispatch(handleChange(!loading, 'USER_REDUCER_LOADING'))
        dispatch(handleChange(data, 'SET_USER_LOGED_IN'))
        history.push('/usuarios')
        break;
    }
  })
  .catch(e => {
    dispatch(handleChange(!loading, 'USER_REDUCER_LOADING'))
  });

}

export const FazerLogof = () => async (dispatch, getState) => {
  const { user: { user: { token } } } = getState();
  await fetch(`http://localhost:8080/curso-api/login?logout`, { method: 'post', headers: new Headers({Authorization: token, "Content-Type": "application/json"}) })
  .then(resp => resp.json())
  .then(data => console.log(data))
}