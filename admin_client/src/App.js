// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import DeviceList from "./scenes/devicelist";
import DeviceStateList from "./scenes/devicestatelist";
import Invoices from "./scenes/invoices";
import PriceList from "./scenes/pricelist";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import ChargeHistory from "./scenes/chargehistory";
import ErrorList from "./scenes/errorlist";
import DeviceMap from "./scenes/devicemap";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";



function MainView(){
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/devicelist" element={<DeviceList />} />
              <Route path="/devicestatelist" element={<DeviceStateList />} />
              <Route path="/pricelist" element={<PriceList />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/chargehistory" element={<ChargeHistory />} />
              <Route path="/errorlist" element={<ErrorList />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/devicemap" element={<DeviceMap />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  const [mode, setMode] = useState(false);  

  useEffect(() => {
    fetch("http://localhost:5005/checkLogin",{credentials: 'include'})
      .then((res) => 
        
        res.json()
      )
      .then((data) => {        
        if (!data.isGuest) {
          setMode(false)
        }else{
          setMode(true)
        }
        
      });
  }, []);

  let content = null;

  if(mode){
    content = <MainView/>
  }else {
    content =  <Login setMode={setMode} />
  }
  
  


  // const [mode, setMode] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5005/")
  //     .then((res) => 
        
  //       res.json()
  //     )
  //     .then((data) => {        
  //       if (data.isGuest) {
  //         setMode("WELCOME");
  //       }
  //       else {
  //         setMode("LOGIN");
  //       }
  //     });
  // }, []);

  // let content = null;  

  // if(mode==="LOGIN"){
  //   content = <Login setMode={setMode}></Login> 
  // }
  // else if (mode === 'SIGNIN') {
  //   content = <Signin setMode={setMode}></Signin> 
  // }
  // else if (mode === 'WELCOME') {
  //   content = <>
  //   <h2>메인 페이지에 오신 것을 환영합니다</h2>
  //   <p>로그인에 성공하셨습니다.</p> 
  //   <a href="/logout">로그아웃</a>   
  //   </>
  // }

  return (
    <div className="default-dg">
      {content}
    </div>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
