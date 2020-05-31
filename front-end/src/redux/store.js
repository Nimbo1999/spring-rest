import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './root-reducer'

const MIDDLEWARES = [thunk];

if (process.env.NODE_ENV === 'development') MIDDLEWARES.push(logger)

export const store = createStore(rootReducer, applyMiddleware(...MIDDLEWARES));