import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useEffect } from 'react';
import { useState } from 'react';
import {fetchGet} from "../../communication/handlefetch"

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Data, setData] = useState([]);


  const columns = [
    { 
      field: "id",
      headerName: "ID", 
      headerAlign: "center",
      align: "center",
      flex: 0.5 
    },
    { 
      field: "d_id", 
      headerName: "충전기 명",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    {
      field: "d_error",
      headerName: "에러코드",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "v_id",
      headerName: "공금업체 명",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "v_error",
      headerName: "공금업체 에러코드",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "e_info",
      headerName: "에러 정보",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "o_time",
      headerName: "발생시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

  ];

  useEffect(() => {
    fetchGet("/charge_error_history")
      .then((data) => {        
        setData(data)
      });
  }, []);


  return (

    
    <Box m="20px">
      <Header
        title="충전기 장애이력"
        subtitle="지난 한달간의 충전기의 장애이력이 출력됩니다"
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
