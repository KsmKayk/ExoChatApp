const io = require("socket.io-client");
let ws = io("http://localhost:3000");

ws.on("connect", socket => {
  console.log(`Conectado com sucesso`);

  ws.emit("message", "Client1 Conectando");

  ws.on("message", message => {
    console.log(message);
  });
});
