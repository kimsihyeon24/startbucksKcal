const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const User = require("./models/user")
const dbURI = "mongodb://localhost:27017/starbuckskcal"

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err))

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("처음 해봅니다... 서버가 잘 작동합니다.")
})

app.post("/api/signup", async (req, res) => {
  const { email, password, nickName } = req.body
  console.log("회원가입 요청 데이터:", { email, password })

  try {
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    })
    if (existingUser) {
      return res.status(402).json({ message: "이미 사용 중인 이메일입니다." })
    }
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      nickName,
    })
    await newUser.save()
    res.status(201).json({ message: "회원가입이 완료되었습니다." })
  } catch (error) {
    console.error("회원가입 오류:", error)
    res.status(500).json({ message: "회원가입 중 오류가 발생했습니다." })
  }
})

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body
    console.log("로그인 요청 데이터:", { email, password }) 

    try {
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(404).json({ message: "존재하지 않는 이메일입니다." })
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." })
        }
        res.status(200).json({ message: "로그인 성공!" })
    }
    catch (error) {
        console.error("로그인 오류:", error)
        res.status(500).json({ message: "로그인 중 오류가 발생했습니다." })
    }

})

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 작동 중입니다.`)
})
