import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";
import axios from "axios";

const Welcome = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (e) => setEmail(e.target.value);
  const handlePwChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", { email, password });
      alert(response.data.message);
      navigate("/signup");
    } catch (error) {
      alert("로그인 요청 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = async () => {
    navigate("/signup");
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-5">
        여러분의 다이어트를 응원합니다!
      </h1>
      <div className="flex flex-col items-center gap-5">
        <div className="w-1/3">
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={email}
            onChange={handleIdChange}
          />
        </div>
        <div className="w-1/3">
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePwChange}
          />
        </div>
        <div className="w-1/3 flex gap-5 justify-center">
          <Button text={"회원가입"} onClick={handleSignUp} type="brown" />
          <Button text={"로그인"} onClick={handleLogin} type="green" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
