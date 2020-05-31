import { combineReducers } from 'redux'
import usuarioReducer from './usuariosReducer/usuarios-reducer'

const rootReducer = combineReducers({
  usuarios: usuarioReducer
})

export default rootReducer