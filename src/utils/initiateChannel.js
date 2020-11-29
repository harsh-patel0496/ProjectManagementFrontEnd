import Echo from "laravel-echo";
import store from '../redux/index';
window.io = require('socket.io-client');



export const initiateChannel = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: window.location.hostname + ':6001', // this is laravel-echo-server host
        auth: {
            headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: "application/json"
            }
        }
    });
}

export const initiateChatRoom = (channel,scrollbars) => {
    window.Echo.private(channel).stopListening('.chat-event');
    window.Echo.private(channel).listen(".chat-event",data => {
    
        let messages = store.getState().messanger.messages;
        store.dispatch({
            type:'SET_MESSAGE',
            payload: {
                messages: [...messages,data.message]
            }
        });
        scrollbars && scrollbars.current.scrollToBottom();
  });
}