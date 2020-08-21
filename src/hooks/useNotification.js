import store from '../redux/index'

function useNotification(props) {
    
    const setNotification = (config) => {
        store.dispatch({
            type:"SET_NOTIFICATION",
            payload: config
        })
    }

    return [setNotification]
}

export default useNotification