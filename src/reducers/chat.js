import { SEND_CHAT, RECEIVE_MESSAGE, GET_ALL_CHATS } from '../actions/chat';
import { Alert } from 'react-native';

export default (state = {chats:[]}, actions) => {
    switch(actions.type){
       case GET_ALL_CHATS:
            return Object.assign({}, state, {
                process_status: 'completed',
                chats: state.chats.concat(actions.payload.message)
            });
        case SEND_CHAT:
            return Object.assign({}, state, {
                process_status: 'completed',
                chats: [...state.chats, actions.payload.message]
            });
        case RECEIVE_MESSAGE:
            //Alert.alert('RECEIVE_MESSAGE - PAYLOAD ', JSON.stringify(actions.payload));
            return Object.assign({}, state, {
                process_status: 'completed',
                //chats: [...state.chats, actions.payload.message]
                chats: [actions.payload.message]
            });

        default:
            return state;
    }
}