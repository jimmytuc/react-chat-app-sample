import { SEND_CHAT, RECEIVE_MESSAGE, GET_ALL_CHATS } from '../actions/chat';


export default (state = {chats:[]}, actions) => {
    switch(actions.type){
       case GET_ALL_CHATS:
            return Object.assign({}, state, {
                process_status: 'completed',
                chats: state.chats.concat(actions.payload)
            });

        case SEND_CHAT:
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, {
                process_status: 'completed',
                chats: [...state.chats, actions.payload]
            });

        default:
            return state;
    }
}