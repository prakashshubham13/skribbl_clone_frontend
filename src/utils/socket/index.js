import { io } from "socket.io-client";

export const createSocket = (url) => {
const socket = io(url);
return socket;
}