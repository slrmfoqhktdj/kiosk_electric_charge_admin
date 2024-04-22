import { Box} from "@mui/material";


import Header from "../../components/Header";
import { useEffect } from 'react';
import { useState } from 'react';

import {fetchGet} from "../../communication/handlefetch"



import DeviceStateListComponent from "../../components/DeviceStateList";


const DeviceStateList = () => {

  const [Data, setData] = useState([]);
  const [Mounted,setMounted] = useState(1);


  useEffect(() => {
    
    fetchGet("/devicestatelist")
      .then((data) => {        
        setData(data)
      });
  }, [Mounted]);

  const changeMounted = () => setMounted(Mounted+1);

  return (
    <Box m="20px">
      <Header title="충전기 상태 정보" subtitle="충전기의 상태와 에러코드 및 현황을 볼 수 있습니다" />
      
      <DeviceStateListComponent Data={Data} setMounted = {changeMounted}/>
    </Box>
  );
};

export default DeviceStateList;



