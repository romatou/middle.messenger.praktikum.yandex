const ws = new WebSocket('ws://example.com/ws');
// если страница загружена по https://
const wss = new WebSocket('wss://example.com/ws');

// События WebSocket
ws.addEventListener('open', listener);     // соединение установлено
ws.addEventListener('message', listener);  // пришло новое сообщение
ws.addEventListener('error', listener);    // ошибка
ws.addEventListener('close', listener);    // сокет закрылся

//
const buffer = new ArrayBuffer(128);
socket.send(buffer);

const intview = new Uint32Array(buffer);
socket.send(intview);

const blob = new Blob([buffer]);
socket.send(blob);

// Format
{
		"action": "SEND_TEXT",
		"payload": { "message": "text" }
}

{
	"action": "MESSAGES",
	"payload": { "page": 2 }
}

// Обёртка
const webSocketService = new WebSocketService('/ws');

webSocketService.send('SEND_TEXT', { message: 'text' });
webSocketService.subscribe('MESSAGES', function (payload) {
	const state = payload.state;
	chat.setProps(state);
});
