import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useEffect } from 'react';
import { useState } from 'react';
import {fetchGet} from "../../communication/handlefetch"

import ChargeDailyComponent from "../../components/ChargeDaily";

const ChargeDaily = () => {

  const [Data, setData] = useState([]);


  useEffect(() => {
    fetchGet("/charge_daily_list")
    .then((data) => {        
      setData(data)
    });
  }, []);


  return (

    
    <Box m="20px">
      
      <Header title="일자별 충전량 조회" subtitle="일자별 총 충전량 및 매출액을 조회합니다" />
      
      <ChargeDailyComponent Data={Data} />
    </Box>
  );





};

export default ChargeDaily;
