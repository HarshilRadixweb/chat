const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById("sendContainer");
const msgInput = document.getElementById("messageInp");
const msgContainer = document.querySelector(".container");
const name = prompt("ENTER YOUR NAME TO JOIN");
const audio = new Audio("tone.mp3");
const appendMsg = function (msg, pos) {
  const newMsg = document.createElement("div");
  newMsg.innerText = msg;
  newMsg.classList.add("message");
  newMsg.classList.add(pos);
  msgContainer.append(newMsg);
  if (pos != "right") {
    audio.play();
  }
};

socket.emit("new-user-join", name);

socket.on("user-join", function (data) {
  appendMsg(`${data} joined the chat`, "center");
});

socket.on("recive", function (data) {
  appendMsg(`${data.name} : ${data.message}`, "left");
});
socket.on("left", function (data) {
  appendMsg(`${data} left the chat`, "center");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const msg = msgInput.value;
  appendMsg(`You: ${msg}`, "right");
  socket.emit("send", msg);
  msgInput.value = "";
});
