import { Box,   useTheme } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../../theme";


import Header from "../../components/Header";
import { useCallback, useEffect,useState } from 'react';
// import { useRef } from 'react';

import {fetchPost,fetchGet} from '../../communication/handlefetch'

import  Button  from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FormLabel from '@mui/material/FormLabel';

import DatePicker from 'react-datepicker';
import { ko } from "date-fns/locale";   

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import CalendarContainer from "../../components/CalenderContainer";
import TablePagination from "@mui/material/TablePagination";

import CustomTableSearcher from "../../components/CustomTableSearcher";

// import { height } from "@mui/system";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [UpdateDialog,setUpdateDialog] = useState(false);

  const [Data, setData] = useState([]);

  const [Mounted,setMounted] = useState(1);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",s_version:""});
  const [anchorEl, setAnchorEl] = useState(null);
  const [RetrieveDate, setRetrieveDate] = useState();

  const open = Boolean(anchorEl);

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

  

  const columns = [
    { 
      field: "id", 
      headerName: "기기명" ,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
      
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
      field: "f_state",
      headerName: "업데이트상태",
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
      field:"rowmenu",
      headerName:"",
      headerAlign: "center",
      align: "center",
      sortable:false,             // 컬럼 정렬
      disableColumnMenu:true,     // 컬럼 메뉴
      flex: 0.5,
      toolbar:false,
      renderCell:(params) =>{
        return(
          <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(event)=> openPositionMenu(event,params.row)}
        >
          <MoreVertIcon />
        </IconButton>
        )
        
      }
    }
  ];


  const getPageData = useCallback(async () => {
    fetchGet(`/deviceswlist/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
    .then((data) => {        
      setData(data?.item)
      setDataCount(data?.count)
    });
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData();
  }, [Mounted,getPageData]);

  const SearchHandle = (column ,data) => {
    console.log(data)

    if(!data||data===""){
      setIsSearch(false)
      setPage(0)
      getPageData()
    }else{
      setIsSearch(true)

      fetchGet(`/deviceswlist/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.item)
          setDataCount(data?.item?.length)
      });
    }
    
  }

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
    // setRetrieveDate(new Date().setHours(new Date().getHours()+1))
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };



  function openUpdateDialog(){
    setUpdateDialog(true)
  }

  function closeUpdateDialog(){
    setUpdateDialog(false)
    // setSelectedItemId(null)
  }

  const handleClickDatePicker= (date) => {
    setRetrieveDate(date)
  }

  function CustomToolBar (){
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <CustomTableSearcher
          MenuList={columns.filter((item) => ( item.field !== "rowmenu"))}
          SearchHandle={SearchHandle}
        />
        
      </GridToolbarContainer>
    )
    
  }


  return (
    <Box m="20px">
      <Header title="충전기 업데이트" subtitle="충전기의 소프트웨어 업데이트를 원격진행합니다. 결과 반영은 일정 시간이 소요됩니다." />
      
      <Box
        m="20px 0 0 0"
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
          rows={Data&&Data.length? Data:[]} 
          columns={columns}           
          // initialState={{
          //   sorting: {
          //     sortModel: [{ field: 'u_time', sort: 'desc' }],
          //   },
          // }}
          components={IsSearch?{ Toolbar: CustomToolBar }:{ Toolbar: CustomToolBar ,Pagination : TablePaginationFunc}}
          disableColumnMenu
          disableColumnFilter
        // onRowClick={(rows) => {
        //   console.log(rows);
        // }}
        
        // onRowSelectionModelChange={
        //   (ids)=>{
        //     const selectedIDs = new Array(ids);
        //     // const selectedRowData = Data.filter((row)=> selectedIDs.has(row.id.toString()))
        //     // console.log(selectedRowData)
        //     setCheckedItem(selectedIDs)
        //     // console.log(selectedIDs)
        //   }
        // }
        />
      </Box>

      
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={closePositionMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>{closePositionMenu(); openUpdateDialog()}}>업데이트</MenuItem>
      </Menu>




      <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        open={UpdateDialog}
        onClose={closeUpdateDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("device_id",SelectedItemId.id)
            const formJson = Object.fromEntries(formData.entries());
            
            fetchPost("/command/upd",formJson)
            
            .then((json) => {  
              console.log(json)
              if(json.isUpdated){
                
                closeUpdateDialog();
                setMounted(Mounted+1)
              }
              else {
                alert(json.errorMessage)
              }
            }).catch((err) => {
                console.error(err);
           
            });

          },
        }}
      >
        <DialogTitle>업데이트</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 충전기의 소프트웨어 업데이트를 진행합니다.
          </DialogContentText>
          
          <TextField
            // autoFocus
            required
            margin="dense"
            label="업데이트할 버전"
            name="version"
            fullWidth
            color="success"
            variant="standard"
            helperText={"현재 버전 : "+SelectedItemId.s_version}
            // defaultValue={SelectedItemId.s_version}
          />
          <TextField
            // autoFocus
            margin="dense"
            label="실패시 재시도 횟수"
            name="Retries"
            fullWidth
            type={"number"}
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            margin="dense"
            label="실패시 재시도 간격(초)"
            name="RetryInterval"
            fullWidth
            type={"number"}
            color="success"
            variant="standard"
          />
          <p></p>
          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group" m="20px">실패시 재시도 지정 시간* &nbsp;&nbsp;&nbsp;   </FormLabel>
          <p></p>
          <DatePicker
            label="yyyy-MM-dd HH:mm:ss"
            required
            name="RetrieveDate"
            showTimeSelect
            locale={ko} 
            minDate={new Date()}
            selected={RetrieveDate}
            onChange={handleClickDatePicker}
            dateFormat= "yyyy-MM-dd HH:mm:ss"
            popperContainer={CalendarContainer}
          />
          
          
          <p></p>

          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">업데이트하기</Button>
        </DialogActions>
      </Dialog>



      
      
      
    </Box>

    
  );
};

export default Team;
