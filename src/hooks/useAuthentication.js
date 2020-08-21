import store from '../redux/index'

function useAuthentication(props) {
    
    const setLogin = (user) => {
        localStorage.setItem('user',JSON.stringify(user));
        store.dispatch({
            type:"SET_LOGIN",
            payload: user
        });
    }

    const setLogout = () => {
        store.dispatch({
            type:"SET_LOGOUT"
        })
    }
    const setUserToRedux = (user) => {
        let storedUser = localStorage.getItem('user')
        if(storedUser !== '' && storedUser !== undefined){
            storedUser = JSON.parse(storedUser);
            let updatedUser = {...storedUser,user: {...user}}
            localStorage.setItem('user',JSON.stringify(updatedUser));
        }

        store.dispatch({
            type:"SET_UPDATED_USER",
            payload: user
        });
    }
    const user = store.getState().auth.user.user
    return [user,setLogin,setLogout,setUserToRedux]
}

export default useAuthentication