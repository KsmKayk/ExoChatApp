const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 3001;
const app = express();
app.server = http.createServer(app);
const io = require("socket.io")(app.server);

app.use(morgan("dev"));
app.use(
  cors({
    exposedHeaders: "*"
  })
);
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

let clients = [];

io.on("connect", socket => {
  const userId = clients.length + 1;

  socket.userId = userId;

  const newClient = {
    userId: userId,
    ws: socket
  };

  clients.push(newClient);

  console.log(
    `cliente conectado com socketId -> ${socket.id} e id -> ${userId}`
  );

  socket.on("message", message => {
    console.log(message);
  });

  socket.on("disconnect", reason => {
    console.log(
      `cliente desconectado com socketId -> ${socket.id} e id -> ${userId}`
    );

    clients = clients.filter(client => client.userId !== userId);
  });
});

app.get("/", (req, res) => {
  return res.json({
    Version: "1.0.0"
  });
});

app.get("/api/allConnections", (req, res, next) => {
  return res.json({
    people: clients
  });
});

setInterval(() => {
  console.log(`${clients.length} pessoas conectadas`);

  if (clients.length > 0) {
    clients.forEach(client => {
      //console.log(`Client Id ${client.userId}`);
      const msg = `Ei id:${client.userId}: você recebeu uma nova mensagem do servidor`;
      client.ws.emit("message", msg);
    });
  }
}, 3000);

app.server.listen(process.env.PORT || PORT, () => {
  console.log(`App rodando em ${app.server.address().port}`);
});

module.exports = app;
