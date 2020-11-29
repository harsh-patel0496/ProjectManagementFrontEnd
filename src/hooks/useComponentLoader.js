import store from '../redux/index'

function useComponentLoader(props) {
    
    const setLoader = (config) => {
        store.dispatch({
            type:"SET_LOADER",
            payload: config
        })
    }

    return [setLoader]
}

export default useComponentLoader