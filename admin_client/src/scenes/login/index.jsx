import { useState } from 'react';
import { Navigate } from "react-router-dom";

function LoginView(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    
    return <>
      <div className='loging-bg'>
          <div className="login-div">
            <h2 className='login-title'>관리자</h2>
            <p></p>
            <div className="form">
              <input className="login-id-tv" type="text" name="username" placeholder="이메일"  onChange={event => {
                setId(event.target.value.trim());
              }} />
              <input className="login-pw-tv" type="password" name="pwd" placeholder="비밀번호" onChange={event => {
                setPassword(event.target.value.trim());
              }} />
              <p></p>
              <input className="login-btn" type="submit" value="로그인" onClick={() => {

                if(id.length === 0|| password.length === 0){
                  alert("빈칸을 채워주세요")
                }else{
                  const userData = {
                    email: id,
                    password: password,
                  };
                  fetch("http://localhost:5005/authenticate", { //auth 주소에서 받을 예정
                    method: "post", // method :통신방법
                    headers: {      // headers: API 응답에 대한 정보를 담음
                      "content-type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(userData), //userData라는 객체를 보냄
                  })
                    .then((res) => res.json())
                    .then((json) => {            
                      if(json.isLogin===true){
                        props.setMode(true);
                        <Navigate  to = "/"/>
                    }
                    else {
                      alert(json.errorMessage)
                    }
                  });
                }
              }} />
              <p></p>
            </div>
          </div>
      </div>
      
      
    </> 
  }


  
export default LoginView;