import { handleChange } from '../actions'

export const FazerLogin = history => async (dispatch, getState) => {
  const { loading, user: { username, password } } = getState()
  console.log(history)
  dispatch(handleChange(!loading, 'USER_REDUCER_LOADING'))
  const body = {
    login: username,
	  senha: password
  }
  await fetch('http://localhost:8080/curso-api/login', {method: 'POST', body: JSON.stringify(body)})
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(e => dispatch(handleChange(!loading, 'USER_REDUCER_LOADING')));

}