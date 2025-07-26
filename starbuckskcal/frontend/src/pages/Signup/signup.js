import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleNickNameChange = (e) => setNickName(e.target.value);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        nickName
      }).then((response) => {
        alert(response.data.message);
        navigate("/");
      });
    
    } catch (error) {
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex-col bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <div className="mb-4">
          <Input
            type="nickName"
            placeholder="닉네임"
            value={nickName}
            onChange={handleNickNameChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className="flex justify-center gap-4">
          <div>
            <Button text="회원가입" onClick={handleSignup} type="green" />
          </div>
          <div>
            <Button text="돌아가기" onClick={handleGoBack} type="brown" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
