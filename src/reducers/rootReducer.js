import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import NotificationReducer from './NotificationReducer'
import CompanyTypesReducer from './CompanyTypesReducer'

const RootReducer = combineReducers({
    auth: AuthReducer,
    notification: NotificationReducer,
    company: CompanyTypesReducer
})

export default RootReducer