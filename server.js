import express from 'express'
const app = express();

import http from 'http';

const server = http.createServer(app)

import { WebSocketServer , WebSocket} from 'ws';

const wss = new WebSocketServer({ server:server });

wss.on('connection', function connection(ws) {
    console.log('New client')
  ws.on('message', function message(data,isBinary) {
    console.log('Recibido: %s', data);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data,{ binary: isBinary });
      }
    });
  });
});

app.get('/', (req,res) => res.send('Estp es un servidor'))

server.listen(3000, () => console.log('Listening on port: 3000'))