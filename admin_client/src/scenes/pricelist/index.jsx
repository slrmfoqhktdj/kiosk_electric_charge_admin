import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect } from 'react';
import { useState } from 'react';
import {fetchGet, fetchPost} from "../../communication/handlefetch"
import  Button  from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const Contacts = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Data, setData] = useState([]);

  const [sDialog,setDialog] = useState(false);
  const [RemoveDialog,setRemoveDialog] = useState(false);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",price:"",time:"",writer:""});

  const [Mounted,setMounted] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function openinsertDialog(){
    setDialog(true)
  }

  function closeinsertDialog(){
    setDialog(false)
  }

  function openRemoveDialog(){
    setRemoveDialog(true)
  }

  function closeRemoveDialog(){
    setRemoveDialog(false)
    // setSelectedItemId(null)
  }

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  const columns = [
    { 
      field: "id",
      headerName: "ID", 
      headerAlign: "center",
      align: "center",
      flex: 0.5 ,
    },
    { 
      field: "price", 
      headerName: "단가",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
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

  useEffect(() => {
    fetchGet("/pricelist")
      .then((data) => {        
        setData(data)
      });
  }, [Mounted]);


  return (

    
    <Box m="20px">
       {
        isDashboard?
        null
        :
        <Header
        title="충전요금 단가관리"
        subtitle="충전요금의 단가를 관리합니다. 가장 최신 등록된 단가가 적용됩니다."
        />
      }

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

          rows = {Data}
          columns={columns}
          components={{ Toolbar: isDashboard? null:GridToolbar }} 
          hideFooter={isDashboard}
          initialState={{
            sorting: {
              sortModel: [{ field: 'time', sort: 'desc' }],
            },
          }}
        />
      </Box>

      {
        isDashboard?
        null
        :
        <Box
        m="20px 20px 0 0"
        display="flex"
        justifyContent="flex-end"
        >
          <Button variant="outlined" color="secondary" onClick={openinsertDialog}
          sx={
            {
              width:"5vw",
              height:"3vh"
            }
          }
          >등록</Button>

        </Box>
      }
      

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
        <MenuItem onClick={()=>{closePositionMenu(); openRemoveDialog()}}>삭제</MenuItem>
      </Menu>


      <Dialog
        open={sDialog}
        onClose={closeinsertDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            
            fetchPost("/price/register",formJson)
            .then((data) =>{
              if(data.isInserted===true){
                
                closeinsertDialog();

                setMounted(Mounted+1)
              }
              else {
                alert(data.errorMessage)
              }
            })


          },
        }}
      >
        <DialogTitle>충전요금단가 갱신</DialogTitle>
        <DialogContent>
          <DialogContentText>
            충전요금단가를 갱신합니다
          </DialogContentText>

           <TextField
            // autoFocus
            required
            margin="dense"
            label="단가"
            name="price"
            fullWidth
            color="success"
            type={"number"}
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="등록인"
            name="writer"
            fullWidth
            color="success"
            variant="standard"
          />
          

          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeinsertDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">추가하기</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={RemoveDialog}
        onClose={closeRemoveDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const deviceid = {
              id:SelectedItemId.id,
              writer:SelectedItemId.writer,
              
            }

            fetchPost("/price/remove",deviceid)
            .then((json) => {           
              if(json.isRemoved===true){
                
                closeRemoveDialog();

                setMounted(Mounted+1)
              }
              else {
                alert(json.errorMessage)
              }
            });


          },
        }}
      >
        <DialogTitle>단가 데이터 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}의 단가 데이터를 삭제하시겠습니까?
          </DialogContentText>
          
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRemoveDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">삭제하기</Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default Contacts;
