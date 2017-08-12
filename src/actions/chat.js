'use strict';
import { AsyncStorage } from 'react-native';
import Pusher from 'pusher-js/react-native';
import { Id, Channel, BindName } from '../constants/Pusher';
import { API } from '../constants/Ws';
import axios from 'axios';
import 'moment';


// pub/sub via chat-channel
/**
 * // Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('3ce3910dc754ee381bcb', {
  cluster: 'ap1',
  encrypted: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(data.message);
});
 */

export const SEND_CHAT = "SEND_CHAT";
export const GET_ALL_CHATS = "GET_ALL_CHATS";
export const RECEIVE_MESSAGE = " RECEIVE_MESSAGE";

/**
 * 
 * @param {*} payload 
 */
const sendChat = (payload) => {
    return {
        type: SEND_CHAT,
        payload: payload
    };
};

/**
 * 
 * @param {*} payload 
 */
const getChats = (payload) => {
    return {
        type: GET_ALL_CHATS,
        payload: payload
    };
};

/**
 * 
 * @param {*} payload 
 */
const newMessage = (payload) => {
    return {
        type: RECEIVE_MESSAGE,
        payload: payload
    };
};

// function for adding messages to AsyncStorage
const addToStorage = (data) => {
    AsyncStorage.setItem(data.convo_id + data.sent_at, JSON.stringify(data), () => {})
}


// function that listens to pusher for new messages and dispatches a new
// message action
/**
 * 
 * @param {*} dispatch 
 */
export function receiveMessage(dispatch){
    const socket = new Pusher(Id);
    const channel = socket.subscribe(Channel);
    channel.bind(BindName,
        (data) => {
            addToStorage(data.chat);
            dispatch(newMessage(data.chat));
        }
    );
}

/**
 * 
 * @param {*} sender 
 * @param {*} message 
 */
export function apiSendChat(sender, message){
    const chat = {sender: sender, message: message, sent_at: moment().format() };
    return dispatch => {
        return axios.get(API + JSON.stringify(chat))
          .then(response => {
            // console.log('Message sent!');
            dispatch(sendChat(response));
          }).catch(err =>{
              console.log("error", err);
          });
    };
};

/**
 * 
 */
export function apiGetChats() {
    //get from device async storage and not api
    return dispatch => {
        return AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                let chats = [];
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    chats.push(JSON.parse(store[i][1]));
                });
                dispatch(getChats(chats));
            });
        });
    };
}

/**
 * export function fetchMessages(roomId) {
    return function(dispatch) {
        dispatch(requestMessages(roomId));
        return chatApi.getMessages(roomId).then(messages => {
            dispatch(receiveMessages(messages))
        }).catch(error => {
            dispatch(requestMessagesFailure(error))
        })
    }
}
 */