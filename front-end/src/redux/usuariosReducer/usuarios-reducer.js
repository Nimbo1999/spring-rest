const usuariosReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case 'FETCH_USUARIOS_USUARIOS': {
      return payload
    }

    default: {
      return state
    }
  }
}

export default usuariosReducer;