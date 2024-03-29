import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect } from 'react';
import { useState } from 'react';
import {fetchGet} from "../../communication/handlefetch"

const Contacts = () => {
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
      field: "price", 
      headerName: "단가",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    // {
    //   field: "name",
    //   headerName: "Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "time",
      headerName: "등록시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "writer",
      headerName: "등록인",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   flex: 1,
    // },
    // {
    //   field: "city",
    //   headerName: "City",
    //   flex: 1,
    // },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];

  useEffect(() => {
    fetchGet("/pricelist")
      .then((data) => {        
        setData(data)
      });
  }, []);


  return (

    
    <Box m="20px">
      <Header
        title="충전요금 단가관리"
        subtitle="충전요금의 단가를 관리합니다"
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

export default Contacts;
