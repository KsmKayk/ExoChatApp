const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 3000;
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
app.use((req, res) => {
  res.json({
    Version: "1.0.0"
  });
});

io.on("connect", socket => {
  console.log(`cliente conectado = ${socket.id}`);
  socket.on("disconnect", reason => {
    console.log(`cliente desconectado = ${socket.id}`);
  });

  socket.on("messageC", data => {
    console.log(`Nova mensagem do cliente: ${data}`);

    socket.emit("messageS", `Olá cliente, prazer em te conhecer`);
  });
});

app.server.listen(process.env.PORT || PORT, () => {
  console.log(`App rodando em ${app.server.address().port}`);
});

module.exports = app;
