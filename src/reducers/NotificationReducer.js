const initialState = {
    options: {
        open: false,
        type: '',
        message: '',
        vertical: 'top',
        horizontal: 'center'
    }
}

const NotificationReducer = (state = initialState, actions) => {
    switch(actions.type){
        case 'SET_NOTIFICATION':
            return { ...state,options: {...state.options,...actions.payload}}
        case 'SET_LOGOUT':
            return { ...state, loggedIn:false,user: {}}
        default:
            return state;
    }
}

export default NotificationReducer;