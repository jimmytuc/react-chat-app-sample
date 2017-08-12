'use strict';
import { AsyncStorage } from 'react-native';
import Pusher from 'pusher-js/react-native';
import { Id, Channel, BindName } from '../constants/Pusher';
import { API } from '../constants/Ws';
import axios from 'axios';
//import moment from 'moment';

import { Alert } from 'react-native';

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
export function newMessage(payload) {
    
    return {
        type: RECEIVE_MESSAGE,
        payload: payload
    };
};

// function for adding messages to AsyncStorage
const addToStorage = (resp) => AsyncStorage.setItem(resp.message._id + resp.message.createdAt, JSON.stringify(resp.message))

// function that listens to pusher for new messages and dispatches a new
// message action
/**
 * 
 * @param {*} dispatch 
 */
export function receiveMessage(cb){
    Pusher.logToConsole = true;
    const socket = new Pusher(Id, {
      cluster: 'ap1',
      encrypted: true
    });
    const channel = socket.subscribe(Channel);

    try {
        const responder = {
            sender: 'guest1',
            message: { 
                text: '',
                user: {
                    _id: 99,
                    name: "@nana"
                },
                createdAt: new Date(),
                _id: Math.round(Math.random() * 1000000)
            }
        };
        channel.bind(BindName,
            (data) => {
                console.log('received from server: ', data);
                responder.message.text = data.chat;
                addToStorage(responder);
                cb(responder);
            }
        );
    } catch(err) {
        Alert.alert('receiveMessage ', JSON.stringify(err));
    }
    
}

/**
 * 
 * @param {*} sender 
 * @param {*} message 
 */
export function apiSendChat(sender, message){
    const chat = { sender: sender, message: message };
    return dispatch => {
        return axios.post(API, {
            data: chat
        }).then(response => {
            // console.log('Message sent!');
            //Alert.alert('Sent: ', JSON.stringify(response));
            //dispatch(sendChat(response));
          }).catch(err => {
              //console.log("error", err);
              Alert.alert('apiSendChat > Error: ', JSON.stringify(err));
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