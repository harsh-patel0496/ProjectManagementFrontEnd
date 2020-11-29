const initialState = {
    options: {
        open: false
    }
}

const NotificationReducer = (state = initialState, actions) => {
    switch(actions.type){
        case 'SET_LOADER':
            return { ...state,options: {...state.options,...actions.payload}}
        default:
            return state;
    }
}

export default NotificationReducer;