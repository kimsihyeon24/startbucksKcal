const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// 모델 가져오기 (스키마만 불러오는 용도)
const User = require("./models/User").default;

const app = express();
const PORT = 5000;

// MongoDB 연결
mongoose
  .connect("mongodb://localhost:27017/test") // DB 이름: test
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 미들웨어
app.use(cors());
app.use(express.json());

// 테스트 라우트
app.get("/", (req, res) => {
  res.send("백엔드 + MongoDB 연결 완료!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
