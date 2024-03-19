import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';

import Header from "../../components/Header";
import { useEffect } from 'react';
import { useState } from 'react';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Data, setData] = useState([]);

  const columns = [
    { 
      field: "id", 
      headerName: "기기명" ,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "latitude",
      headerName: "위도",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "longitude",
      headerName: "경도",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "addr",
      headerName: "주소",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s_version",
      headerName: "소프트웨어버전",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "h_c_m",
      headerName: "충전기모델",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "h_p_m",
      headerName: "결제기모델",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "h_b_m",
      headerName: "보드모델",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "h_w_m",
      headerName: "날씨센서모델",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "i_time",
      headerName: "등록날짜",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "u_time",
      headerName: "정보갱신시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "enabled",
      headerName: "기기이용가능여부",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { enabled } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              enabled === "정상"
                ? colors.greenAccent[600]
                : enabled === "보류"
                ? colors.grey[600]
                : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {enabled === "정상" && <DoneOutlineIcon />}
            {enabled === "보류" && <HourglassEmptyIcon />}
            {enabled === "불가" && <BlockIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{enabled}</Typography>
          </Box>
        );
      },
    },
  ];


  useEffect(() => {
    fetch("http://localhost:5005/devicelist",{credentials: 'include'})
      .then((res) => 
        
        res.json()
      )
      .then((data) => {        
        setData(data)
      });
  }, []);



  return (
    <Box m="20px">
      <Header title="충전기 기본 정보" subtitle="충전기의 위치와 내장 정보 및 사용여부를 확인할 수 있습니다" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={Data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
