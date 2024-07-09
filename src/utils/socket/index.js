import { io } from "socket.io-client";
export const URL = 'http://localhost:5000';

export const createSocket = (url) => {
const socket = io(url);
return socket;
}