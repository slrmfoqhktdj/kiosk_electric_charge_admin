import React from 'react'
import { Box , useTheme} from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../theme";
import CustomTableSearcher from "../components/CustomTableSearcher";

const ChargeDaily = ({ isDashboard = false, Data ,TablePaginationFunc,SearchHandle,IsSearch = false}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 

  const columns = [
    { 
      field: "day",
      headerName: "일자", 
      headerAlign: "center",
      align: "center",
      flex: 1 
    },
    { 
      field: "amount", 
      headerName: "충전량",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    {
      field: "count",
      headerName: "충전횟수",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pay",
      headerName: "매출액",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  function CustomToolBar (){
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <CustomTableSearcher
          MenuList={columns}
          SearchHandle={SearchHandle}
        />
        
      </GridToolbarContainer>
    )
    
  }


  return (

    
    <Box m={isDashboard ? "20px" : "0px"}>

      <Box
        m={isDashboard ? "20px 0 0 0": "40px 0 0 0"}
        height={isDashboard ? "17vh": "75vh"}
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

          rows = {Data&&Data.length? Data:[]}
          columns={columns}
          hideFooter={isDashboard}
          // initialState={{
          //   sorting: {
          //     sortModel: [{ field: 'id', sort: 'desc' }],
          //   },
          // }}
          getRowId={(row)=> row.day}
          components={IsSearch?{Toolbar: CustomToolBar}:{ Toolbar: isDashboard? null:CustomToolBar , Pagination : isDashboard? null:TablePaginationFunc}} 
          disableColumnMenu
          disableColumnFilter
        />
      </Box>
    </Box>
  );




};

export default React.memo(ChargeDaily);
