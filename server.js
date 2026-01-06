const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let command = "idle";
let lastKey = "";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Python hỏi xem có lệnh gì không
app.get("/command", (req, res) => {
    res.json({ command });
});

// Nút LẤY MÃ
app.post("/start", (req, res) => {
    command = "GET_KEY";
    res.json({ status: "ok" });
});

// Nút XÁC THỰC
app.post("/verify", (req, res) => {
    command = "VERIFY";
    res.json({ status: "ok" });
});

// Python gửi kết quả về
app.post("/result", (req, res) => {
    lastKey = req.body.key || "";
    command = "idle";
    res.json({ status: "received" });
});

// Web lấy key
app.get("/key", (req, res) => {
    res.json({ key: lastKey });
});

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});
