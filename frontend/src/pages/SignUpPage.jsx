import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickName, setNickName] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [email, setEmail] = useState("");
  const [certNum, setCertNum] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handleNickName = (e) => {
    setNickName(e.target.value);
  };
  const handlePw = (e) => {
    setPw(e.target.value);
  };
  const handlePwCheck = (e) => {
    setPwCheck(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleCertNum = (e) => {
    setCertNum(e.target.value);
  };
  const checkId = () => {
    // 아이디 중복 확인 로직
    alert(`아이디: ${id} 중복 확인`);
  };
  const checkNickName = () => {
    // 닉네임 중복 확인 로직
    alert(`닉네임: ${nickName} 중복 확인`);
  }
  const checkPassword = () => {
    if (pw !== pwCheck) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      alert("비밀번호가 일치합니다.");
    }
  }
  const checkEmail = () => {
    // 이메일 중복 확인 로직
    alert(`이메일: ${email} 중복 확인`);
  }
  return (
    <>
      <Link to="/login">
        <div className="text-3xl m-7 cursor-pointer">
          <IoArrowBackCircle />
        </div>
      </Link>
      <div className="flex flex-col items-center gap-20 m-7">
        {/* 회원가입 로고 */}
        <div>
          <h1>회원가입</h1>
        </div>
        {/* 회원가입 폼 */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div>
              <p>아이디</p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="아이디를 입력하시오"
                className="w-80 h-12 text-lg p-3 border rounded-lg"
                onChange={handleId}
              />
              <button
                className="bg-green-800 rounded-lg w-20 h-12 text-white"
                onClick={checkId}
              >
                중복확인
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <p>닉네임</p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="닉네임를 입력하시오"
                className="w-80 h-12 text-lg p-3 border rounded-lg"
                onChange={handleNickName}
              />
              <button className="bg-green-800 rounded-lg w-20 h-12 text-white" onClick={checkNickName}>
                중복확인
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p>비밀번호</p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="비밀번호를 입력하시오"
                className="w-80 h-12 text-lg p-3 border rounded-lg"
                onChange={handlePw}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p>비밀번호 확인</p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="비밀번호를 입력하시오"
                className="w-80 h-12 text-lg p-3 border rounded-lg"
                onChange={handlePwCheck}
              />
              <button className="bg-green-800 rounded-lg w-20 h-12 text-white" onClick={checkPassword}>
                확인
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p>이메일</p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="이메일를 입력하시오"
                className="w-80 h-12 text-lg p-3 border rounded-lg"
                onChange={handleEmail}
              />
              <button className="bg-green-800 rounded-lg w-20 h-12 text-white" onClick={checkEmail}>
                중복확인
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p>인증번호</p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="인증번호를 입력하시오"
                className="w-80 h-12 text-lg p-3 border rounded-lg"
                onChange={handleCertNum}
              />
              <button className="bg-green-800 rounded-lg w-20 h-12 text-white">
                확인
              </button>
            </div>
          </div>
        </div>
        {/* 회원가입 버튼 */}
        <div className="flex gap-10 bg-green-800 rounded-lg w-30 h-12 justify-center">
          <button className=" text-white">회원가입</button>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
