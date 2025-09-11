import Logo from '../assets/starbucksLogo.png'
import { useState } from 'react'

const LoginPage = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const handleId = (e) => {
    setId(e.target.value)
  }

  const handlePw = (e) => {
    setPw(e.target.value)
  }

  const handleLogin = () => {
    alert(`아이디: ${id}, 비밀번호: ${pw}`)
  }

  return (
    <>
    {/* 전체 페이지 다루는 영역 */}
      <div className='flex flex-col justify-center items-center gap-20 h-screen m-7'>
        {/* 상단 로고 제목 */}
        <div className='flex justify-center gap-10 items-center'>
          <div className='w-[7vw]'>
            <img src={Logo} alt="스타벅스 로고" />
          </div>
          <div>
            <h1 className='text-[2vw]'>스타벅스 음료 칼로리 확인 서비스</h1>
          </div>
        </div>  
        {/* 아이디 비밀번호 */}
        <div>
          <div>
            <input type="text"  placeholder='아이디를 입력하시오' onChange={handleId}/>
          </div>
          <div>
            <input type="password" placeholder='비밀번호를 입력하시오'onChange={handlePw}/>
          </div>
        </div>
        {/* 로그인 회원가입 */}
        <div className='flex gap-10'>
          <button onClick={handleLogin}>로그인</button>
          <button>회원가입</button>
        </div>
      </div>
    </>
  )
 
}


export default LoginPage