// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import { useEffect } from 'react';
import { Routes, Route, useLocation  } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import DeviceList from "./scenes/devicelist";
import DeviceStateList from "./scenes/devicestatelist";
import Invoices from "./scenes/invoices";
import PriceList from "./scenes/pricelist";
import ChargeBarGraph from "./scenes/chargebargraph";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import ChargeHistory from "./scenes/chargehistory";
import ErrorList from "./scenes/errorlist";
import DeviceMap from "./scenes/devicemap";
import PublicCode from "./scenes/publiccode";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ChargeDaily from "./scenes/chargedaily";
// import  {fetchPageGet  } from "./communication/handlefetch";
import {ProtectedRoute} from './communication/handlefetch'; 

// function MainView(){
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);


//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar={setIsSidebar} />
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/devicelist" element={<DeviceList />} />
//               <Route path="/devicestatelist" element={<DeviceStateList />} />
//               <Route path="/pricelist" element={<PriceList />} />
//               <Route path="/invoices" element={<Invoices />} />
//               <Route path="/form" element={<Form />} />
//               <Route path="/chargebargraph" element={<ChargeBarGraph />} />
//               <Route path="/pie" element={<Pie />} />
//               <Route path="/line" element={<Line />} />
//               <Route path="/chargehistory" element={<ChargeHistory />} />
//               <Route path="/errorlist" element={<ErrorList />} />
//               <Route path="/chargedaily" element={<ChargeDaily />} />
//               <Route path="/devicemap" element={<DeviceMap />} />
//               <Route path="/publiccode" element={<PublicCode />} />
//             </Routes>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }




function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const location = useLocation();
  const excludedRoutes = ['/login'];  // top,side 포함하지 않는 주소값 정하기
  // const navigate = useNavigate();

  // useEffect(() => {

  //   fetchPageGet("http://localhost:5005/checkLogin")
  //   .then((data) => {        
  //     console.log(data)
  //     if (!data.isGuest && !excludedRoutes.includes(location.pathname)) {
  //       navigate('/login')
  //       // window.sessionStorage.clear() // 사이드바 체크값 삭제
  //     }
      
  //   });
 
  // },[location,navigate,excludedRoutes]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!excludedRoutes.includes(location.pathname) && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!excludedRoutes.includes(location.pathname) &&<Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route element={<ProtectedRoute />}>

                {/* <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/devicelist" element={<ProtectedRoute><DeviceList /></ProtectedRoute>} />
                <Route path="/devicestatelist" element={<ProtectedRoute><DeviceStateList /></ProtectedRoute>} />
                <Route path="/pricelist" element={<ProtectedRoute><PriceList /></ProtectedRoute>} />
                <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
                <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
                <Route path="/chargebargraph" element={<ProtectedRoute><ChargeBarGraph /></ProtectedRoute>} />
                <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
                <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
                <Route path="/chargehistory" element={<ProtectedRoute><ChargeHistory /></ProtectedRoute>} />
                <Route path="/errorlist" element={<ProtectedRoute><ErrorList /></ProtectedRoute>} />
                <Route path="/chargedaily" element={<ProtectedRoute><ChargeDaily /></ProtectedRoute>} />
                <Route path="/devicemap" element={<ProtectedRoute><DeviceMap /></ProtectedRoute>} />
                <Route path="/publiccode" element={<ProtectedRoute><PublicCode /></ProtectedRoute>} /> */}

                <Route path="/" element={<Dashboard />} />
                <Route path="/devicelist" element={<DeviceList />} />
                <Route path="/devicestatelist" element={<DeviceStateList />} />
                <Route path="/pricelist" element={<PriceList />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/chargebargraph" element={<ChargeBarGraph />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/chargehistory" element={<ChargeHistory />} />
                <Route path="/errorlist" element={<ErrorList />} />
                <Route path="/chargedaily" element={<ChargeDaily />} />
                <Route path="/devicemap" element={<DeviceMap />} />
                <Route path="/publiccode" element={<PublicCode />} />
              </Route>

              {/* <Route path="/" element={<ProtectedRoute isAllowed={true} redirectTo={"/login"}><Dashboard/></ProtectedRoute>} /> */}
              
            
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );







  // const [mode, setMode] = useState(false);  

  // useEffect(() => {

  //   // fetchPageGet("http://localhost:5005/checkLogin")
  //   // .then((data) => {        
  //   //   if (!data.isGuest) {
  //   //     setMode(false)
  //   //     // window.sessionStorage.clear() // 사이드바 체크값 삭제
  //   //   }else{
  //   //     setMode(true)
  //   //   }
      
  //   // });

 
  // },[]);

  // let content = null;

  // if(mode){
  //   content = <MainView/>
  // }else {
  //   content =  <Login setMode={setMode} />
  // }
  
  


  // return (
  //   <div className="default-dg">
  //     {content}
  //   </div>
  // );


}

export default App;
