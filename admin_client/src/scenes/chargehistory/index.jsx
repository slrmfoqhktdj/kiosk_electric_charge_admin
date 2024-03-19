import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect } from 'react';
import { useState } from 'react';


const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Data, setData] = useState([]);

  const columns = [
    { 
      field: "id",
      headerName: "결제승인번호", 
      headerAlign: "center",
      align: "center",
      flex: 0.5 
    },
    { 
      field: "device", 
      headerName: "기기명",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    {
      field: "pay",
      headerName: "결제금액",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "can_pay",
      headerName: "취소금액",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pay_by",
      headerName: "결제수단",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_num",
      headerName: "카드번호",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_c_num",
      headerName: "취소시 카드번호",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pay_day",
      headerName: "결제일시",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_pay_day",
      headerName: "부분취소일시",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_conn",
      headerName: "사용커넥터id",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_time",
      headerName: "충전소요시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_amount",
      headerName: "누적충전량",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_time_s",
      headerName: "충전시작시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_time_e",
      headerName: "충전종료시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_time_u",
      headerName: "최근충전량업데이트시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5005/charge_amount_history",{credentials: 'include'})
      .then((res) => 
        
        res.json()
      )
      .then((data) => {        
        setData(data)
      });
  }, []);


  return (

    
    <Box m="20px">
      <Header
        title="충전량 및 이력 조회"
        subtitle="충전기의 결제 및 충전 정보를 조회합니다"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows = {Data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default FAQ;
