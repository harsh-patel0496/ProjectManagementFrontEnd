import store from '../redux/index'

function useMessanger(props) {
    
    const setMessageToRedux = (messages = []) => {
        store.dispatch({
            type:"SET_MESSAGE",
            payload: { messages }
        });
    }

    const messagesFromRudux = store.getState().messanger.messages
    return [messagesFromRudux,setMessageToRedux]
}

export default useMessanger