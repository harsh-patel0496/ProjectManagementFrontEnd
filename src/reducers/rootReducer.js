import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import NotificationReducer from './NotificationReducer'
import CompanyTypesReducer from './CompanyTypesReducer'
import ProjectReducer from './ProjectReducer'

const RootReducer = combineReducers({
    auth: AuthReducer,
    notification: NotificationReducer,
    company: CompanyTypesReducer,
    project: ProjectReducer
})

export default RootReducer