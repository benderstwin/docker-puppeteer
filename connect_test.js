const WebSocket = require('ws');

const ws = new WebSocket('ws://browserless:3500');

ws.on('open', function open() {
  console.log('Connected');
  ws.close();
});

ws.on('error', function error(err) {
  console.error('Connection Error:', err);
});
