const pool = require("../../pgconnect")

let interval;
module.exports = function(io) {
    io.on("connection", (socket) => {
        if (interval) {
            clearInterval(interval);
        }

        interval = setInterval(() => getGioHang(socket), 30000);

        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);

        });
    });


    const getGioHang = async(socket) => {
        try {
            // const data = await pool.query(`select * from khachhang`)
            socket.emit('getGioHang', data.rows);
        } catch {
            console.log("LỖI GIỎ HÀNG")
        }
    };



}