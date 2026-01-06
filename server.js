const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let command = "idle";   // Lệnh Python cần thực hiện
let lastKey = "";       // Key mới nhất

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Python hỏi xem có lệnh gì không
app.get("/command", (req, res) => {
    res.json({ command });
});

// Web bấm LẤY MÃ
app.post("/start", (req, res) => {
    command = "GET_KEY";
    lastKey = ""; // reset key mới
    res.json({ status: "ok" });
});

// Web bấm XÁC THỰC
app.post("/verify", (req, res) => {
    command = "VERIFY";
    res.json({ status: "ok" });
});

// Python gửi key mới về
app.post("/result", (req, res) => {
    const { key } = req.body;
    if (key) {
        lastKey = key;
        console.log("✅ Key mới:", key);
    }
    command = "idle"; // reset lệnh
    res.json({ status: "received" });
});

// Web GET key
app.get("/key", (req, res) => {
    res.json({ key: lastKey });
});

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});
