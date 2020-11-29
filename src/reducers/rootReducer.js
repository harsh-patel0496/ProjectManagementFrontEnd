import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import NotificationReducer from './NotificationReducer'
import CompanyTypesReducer from './CompanyTypesReducer'
import ProjectReducer from './ProjectReducer'
import ChatReducer from './ChatReducer'
import ComponentLoaderReducer from './ComponentLoaderReducer'

const RootReducer = combineReducers({
    auth: AuthReducer,
    notification: NotificationReducer,
    company: CompanyTypesReducer,
    project: ProjectReducer,
    messanger: ChatReducer,
    componentLoader: ComponentLoaderReducer
})

export default RootReducer