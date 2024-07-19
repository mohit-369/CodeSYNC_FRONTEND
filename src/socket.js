import {io} from 'socket.io-client'

export async function initSocket(){
    const option={
        'force new connection':true,
        recoonectionAttempt:Infinity,
        'timeout':300000,
        'transports':['websocket']
    }

    return io("http://localhost:8000", option);
}
