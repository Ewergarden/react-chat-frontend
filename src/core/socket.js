import io from "socket.io-client"




const socket = io('https://react-chat-serv.herokuapp.com/');

export default socket;