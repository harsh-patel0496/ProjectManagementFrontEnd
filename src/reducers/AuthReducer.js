const initialState = {
    isLoggedIn: false,
    user: {}
}

const AuthReducer = (state = initialState,actions) =>{
    switch(actions.type){
        case "SET_LOGIN":
            return {...state,isLoggedIn: true, user: actions.payload}
        case "SET_LOGOUT":
            return {...state,isLoggedIn: false,user: {}}
        case "SET_UPDATED_USER":
            return {...state,user: {...state.user,user: actions.payload}}
        default: 
            return state
    }
}

export default AuthReducer