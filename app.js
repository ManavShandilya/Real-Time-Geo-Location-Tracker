const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path")

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data) {
        io.emit("receive-location", {id: socket.id, ...data });
    });

    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
    console.log("connected");
})

app.get("/", (req, res) => {
    res.render(path.join(__dirname, 'views', 'index.ejs'));
})

server.listen(3000, ()=> {
    console.log("Server is listening");
});