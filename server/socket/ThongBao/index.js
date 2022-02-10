
let interval;
module.exports = function (io){
    io.on("connection", (socket) => {
        if (interval) {
          clearInterval(interval);
        }
    
        // interval = setInterval(() => getThongBaoNguoiDung(socket), 1000);
      
        socket.on("disconnect", () => {
          console.log("Client disconnected");
          clearInterval(interval);
    
        });
      });
    
    
    const getThongBaoNguoiDung = socket => {
      // const response = new Date();
      // // Emitting a new message. Will be consumed by the client
      // socket.emit("FromAPI", response);
    };
}