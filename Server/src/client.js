const io = require("socket.io-client");
let ws = io("http://localhost:3000");

ws.on("connect", socket => {
  console.log(`Conectado com sucesso`);
  ws.emit("messageC", "Meu nome é cliente");
  ws.on("messageS", message => {
    console.log(`Nova mensagem do servidor: ${message}`);
  });
});
