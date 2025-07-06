import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";

const Welcome = () => {
  // 0. useNavigate 훅을 사용하여 페이지 이동 기능을 가져옵니다.
  const navigate = useNavigate();
  // 1. 상태(state) 선언
  const [id, setId] = useState(""); 
  const [pw, setPw] = useState("");

  // 2. 입력값 변경 핸들러 함수
  const handleIdChange = (e) => setId(e.target.value);
  const handlePwChange = (e) => setPw(e.target.value);

  // 3. 로그인 버튼 클릭시 처리 함수 예시
  const handleLogin = () => {
    alert(`아이디: ${id}\n비밀번호: ${pw}`);
    // 실제로는 여기서 서버로 로그인 요청을 보냅니다.
  };

  // 4. 회원가입 버튼 클릭시 처리 함수 예시
  const handleSignUp = () => {
    navigate("/signup");
  }

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
            value={id}
            onChange={handleIdChange}
          />
        </div>
        <div className="w-1/3">
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={pw}
            onChange={handlePwChange}
          />
        </div>
        <div className="w-1/3 flex gap-5 justify-center">
          <Button
            text={"회원가입"}
            onClick={handleSignUp}
            type="brown"
          />
          <Button text={"로그인"} onClick={handleLogin} type="green" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
