import { combineReducers } from 'redux'
import usuarioReducer from './usuariosReducer/usuarios-reducer'
import userReducer from './userReducer/user.reducer' 

const rootReducer = combineReducers({
  usuarios: usuarioReducer,
  user: userReducer
})

export default rootReducer