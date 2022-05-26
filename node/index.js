const io = require("socket.io")(8000);
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-join", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-join", name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("recive", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
