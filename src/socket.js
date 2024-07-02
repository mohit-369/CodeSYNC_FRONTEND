import {io} from 'socket.io-client'

export async function initSocket(){
    const option={
        'force new connection':true,
        recoonectionAttempt:Infinity,
        'timeout':10000,
        'transports':['websocket']
    }

    return io("https://code-sync-backend-7tsa.onrender.com", option);
}
