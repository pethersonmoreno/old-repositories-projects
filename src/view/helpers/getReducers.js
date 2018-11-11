import { combineReducers } from 'redux'
import {reducers as reducersOrganisms} from '../Organisms'
import {reducers as reducersPages} from '../Pages'


export default ()=>
  combineReducers({
    ...reducersOrganisms,
    ...reducersPages,
  })