const initialState = {
    messages: [],
    count: {},
    unreadMessages: {},
    activeChat : ''
}

const ChatReducer = (state = initialState,actions) => {

    switch(actions.type){
        case "SET_MESSAGE":
            return {
                ...state,
                messages: actions.payload.messages
            }
        default:
            return state
    }
}

export default ChatReducer;