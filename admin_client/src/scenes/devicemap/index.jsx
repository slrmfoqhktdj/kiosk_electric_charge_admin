import { Box, useTheme } from "@mui/material";
// import GeographyChart from "../../components/GeographyChart";
import DeviceMap from "../../components/DeviceMap";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useEffect } from 'react';
import {fetchGet} from "../../communication/handlefetch"
import { useState } from "react";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Data, setData] = useState(undefined);

  useEffect(() => {
    fetchGet("/mapdata")
    .then((data) => {        
        setData(data)
    });
  }, []);

  return (
    <Box m="20px">
      <Header title="설치위치 맵" subtitle="현재 설치된 충전기의 위치를 지도로 표시합니다" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >

        <DeviceMap Data = {Data}/>
      </Box>
    </Box>
  );
};

export default Geography;
