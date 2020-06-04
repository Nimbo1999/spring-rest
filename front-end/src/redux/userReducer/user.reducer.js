const INITIAL_STATE = {
  user: {
    isAuthenticated: false,
    token: '',
    username: '',
    password: ''
  },
  loading: false
}

const UserReducer = (state = INITIAL_STATE, action) => {
  const { type } = action
  switch (type) {
    case 'USER_SET_USERNAME': {
      const { payload } = action
      return {
        ...state,
        user: {
          ...state.user,
          username: payload
        }
      }
    }

    case 'USER_SET_PASSWORD': {
      const { payload } = action
      return {
        ...state,
        user: {
          ...state.user,
          password: payload
        }
      }
    }

    case 'SET_USER_LOGED_IN': {
      const { payload } = action
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: payload.isAuthenticated,
          token: payload.Authorization
        }
      }
    }

    case 'USER_REDUCER_LOADING': {
      return {
        ...state,
        loading: !state.loading
      }
    }
  
    default:
      return state
  }
}

export default UserReducer