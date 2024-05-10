import { Box, useTheme } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
// import { DataGrid } from '@material-ui/data-grid';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useCallback, useEffect,useState } from 'react';
import {fetchGet} from "../../communication/handlefetch"
import TablePagination from "@mui/material/TablePagination";
import CustomTableSearcher from "../../components/CustomTableSearcher";


const ErrorList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Data, setData] = useState([]);

  const [DataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [IsSearch, setIsSearch] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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

  const getPageData = useCallback(async () => {
    fetchGet(`/charge_error_history/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
      .then((data) => {      
        setData(data?.item)
        setDataCount(data?.count)
      }).catch((err)=>{});
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData();
  }, [getPageData]);


  const SearchHandle = (column ,data) => {
    console.log(data)

    if(!data||data===""){
      setIsSearch(false)
      setPage(0)
      getPageData()
    }else{
      setIsSearch(true)

      fetchGet(`/charge_error_history/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.item)
          setDataCount(data?.item?.length)
      }).catch((err)=>{});
    }
    
  }

 
  function TablePaginationFunc () {

    return (
      <TablePagination
        component="div"
        count={DataCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
      />
    );
  }

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
          rows = {Data&&Data.length? Data:[]}
          columns={columns}
          // components={{ Toolbar: CustomToolBar ,Pagination : TablePaginationFunc}}
          components={IsSearch?{ Toolbar: CustomToolBar }:{ Toolbar: CustomToolBar ,Pagination : TablePaginationFunc}}
          disableColumnMenu
          
        />
        
      </Box>
    </Box>
  );
};

export default ErrorList;



