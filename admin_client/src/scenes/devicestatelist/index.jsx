import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";


import Header from "../../components/Header";
import { useEffect } from 'react';
import { useState } from 'react';

import {fetchGet} from "../../communication/handlefetch"

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
      field: "conn",
      headerName: "서버연결여부",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "state",
      headerName: "상태",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "state_e",
      headerName: "충전기 에러코드",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "v_id",
      headerName: "공급업체 이름",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "v_error",
      headerName: "공급업체 에러코드",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "e_info",
      headerName: "에러정보",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "u_time",
      headerName: "상태갱신시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "f_state",
      headerName: "펌웨어 업데이트 상태",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "d_state",
      headerName: "진단파일 업로드 상태",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  
  ];


  useEffect(() => {
    
    fetchGet("/devicestatelist")
      .then((data) => {        
        setData(data)
      });
  }, []);



  return (
    <Box m="20px">
      <Header title="충전기 상태 정보" subtitle="충전기의 상태와 에러코드 및 현황을 볼 수 있습니다" />
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
