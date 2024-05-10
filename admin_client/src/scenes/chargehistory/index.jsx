import { Box,Typography } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useCallback, useEffect,useState } from 'react';
import {fetchGet,fetchPost} from "../../communication/handlefetch"

import  Button  from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';
import TablePagination from "@mui/material/TablePagination";

import CustomTableSearcher from "../../components/CustomTableSearcher";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Data, setData] = useState([]);

  const [SelectedItemId,setSelectedItemId] = useState({payid:"",d_id:"",c_pay:"",can_pay:"",pay_by:"",c_num:"",c_c_num:"",pay_day:"",c_pay_day:"",c_conn:"",c_time:"",c_amount:"", c_time_s:"", c_time_e:"", c_time_u:"",c_reason:""});

  const [TransactionDialog,setTransactionDialog] = useState(false);
  const [PayCancleDialog,setPayCancleDialog] = useState(false);

  const [Mounted,setMounted] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
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

  const openPositionMenu = (event,payid) => {
    setSelectedItemId(payid);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  function openStopTransactionDialog(){
    setTransactionDialog(true)
  }

  function closeTransactionDialog(){
    setTransactionDialog(false)
  }

  function openPayCancleDialog(){
    setPayCancleDialog(true)
  }

  function closePayCancleDialog(){
    setPayCancleDialog(false)
  }

  

  const columns = [
    { 
      field: "payid",
      headerName: "충전결제승인번호", 
      headerAlign: "center",
      align: "center",
      flex: 1 ,
      cellClassName: "name-column--cell",
    },
    { 
      field: "d_id", 
      headerName: "기기명",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    {
      field: "c_pay",
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
      renderCell: ({ row: { c_time_s } }) => {
        return (
          <Box
            // width="60%"
            m="0 auto"
            // p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" , fontSize:"12px"}}>{c_time_s?  new Date(c_time_s).toLocaleString(): null}</Typography>
          </Box>
        );
      },
    },
    {
      field: "c_time_e",
      headerName: "충전종료시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { c_time_e } }) => {
        return (
          <Box
            // width="60%"
            m="0 auto"
            // p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" , fontSize:"12px"}}>{c_time_e?  new Date(c_time_e).toLocaleString(): null}</Typography>
          </Box>
        );
      },
    },
    {
      field: "c_time_u",
      headerName: "최근충전량업데이트시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { c_time_u } }) => {
        return (
          <Box
            // width="60%"
            m="0 auto"
            // p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" , fontSize:"12px"}}>{c_time_u?  new Date(c_time_u).toLocaleString(): null}</Typography>
          </Box>
        );
      },
    },
    {
      field:"c_reason",
      headerName: "중단 이유",
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

  


  const stopremoteProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("device_id", SelectedItemId.d_id)
      formData.append("TransactionId", SelectedItemId.payid)
      
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/cmd/rmstp",formJson)
      .then((data) =>{
        if(data?.isStopped===true){
          
          closeTransactionDialog();

          setMounted(Mounted+1)
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  }


  const canclepayProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append("device_id", SelectedItemId.d_id)
      formData.append("OriginPay",SelectedItemId.c_pay)
      formData.append("PayNum", SelectedItemId.payid)
      formData.append("PayDay", SelectedItemId.pay_day)
      formData.append("PayToken", SelectedItemId.c_num)
      
      const formJson = Object.fromEntries(formData.entries());


      if(Number(SelectedItemId.c_pay) < Number(formJson.CanclePay)){
        alert("원 결제액보다 취소금액이 더 많습니다.")
        return;
      }

      fetchPost("/cmd/nccp",formJson)
      .then((data) =>{
        if(data?.isCancled===true){
          
          closePayCancleDialog();

          setMounted(Mounted+1)
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  }

  const getPageData = useCallback(async () => {
    fetchGet(`/charge_amount_history/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
    .then((data) => {        
      setData(data?.item)
      setDataCount(data?.count)
    }).catch((err)=>{});
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData()
  }, [getPageData]);

  const SearchHandle = (column ,data) => {
    console.log(data)

    if(!data||data===""){
      setIsSearch(false)
      setPage(0)
      getPageData()
    }else{
      setIsSearch(true)

      fetchGet(`/charge_amount_history/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.item)
          setDataCount(data?.item?.length)
      }).catch((err)=>{});
    }
    
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

          <MenuItem onClick={()=>{closePositionMenu(); openPayCancleDialog()}} disabled={SelectedItemId.pay_by==="command"||SelectedItemId.c_pay === SelectedItemId.can_pay}>원격부분취소</MenuItem>
          <MenuItem onClick={()=>{closePositionMenu(); openStopTransactionDialog()}} disabled={SelectedItemId.c_time_e}>원격충전중지</MenuItem>
          
        </Menu>

        <Dialog
          open={PayCancleDialog}
          onClose={closePayCancleDialog}
          PaperProps={
            canclepayProps
          }
        >
          
          <DialogTitle>원격부분 금액취소</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {SelectedItemId.d_id}의 충전에 대한 결제액을 필요만큼 취소합니다. - {SelectedItemId.payid}
            </DialogContentText>

            <TextField
            // autoFocus
            required
            margin="dense"
            label="부분취소금액"
            name="CanclePay"
            fullWidth
            type={"number"}
            color="success"
            variant="standard"
          />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={closePayCancleDialog} color="secondary">취소</Button>
            <Button type="submit" color="secondary">원격부분취소하기</Button>
          </DialogActions>

          
        </Dialog>

        <Dialog
          open={TransactionDialog}
          onClose={closeTransactionDialog}
          PaperProps={
            stopremoteProps
          }
        >
          
          <DialogTitle>원격충전 중지</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {SelectedItemId.d_id}의 충전을 원격으로 중지합니다. - {SelectedItemId.payid}
            </DialogContentText>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={closeTransactionDialog} color="secondary">취소</Button>
            <Button type="submit" color="secondary">중지하기</Button>
          </DialogActions>

          
        </Dialog>


        <DataGrid
          rows = {Data&&Data.length? Data:[]}
          columns={columns}
          getRowId={(row)=> row.payid}
          components={IsSearch?{ Toolbar: CustomToolBar }:{ Toolbar: CustomToolBar ,Pagination : TablePaginationFunc}}
          disableColumnMenu
          disableColumnFilter
        />
      </Box>
    </Box>
  );
};

export default FAQ;
