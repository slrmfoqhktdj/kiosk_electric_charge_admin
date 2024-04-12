import { Box,  Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';

import Header from "../../components/Header";
import { useEffect } from 'react';
import { useState } from 'react';
// import { useRef } from 'react';

import {fetchPost,fetchGet} from '../../communication/handlefetch'

import  Button  from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

// import { height } from "@mui/system";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [RegistDialog,setRegistDialog] = useState(false);
  const [UpdateDialog,setUpdateDialog] = useState(false);
  const [RemoveDialog,setRemoveDialog] = useState(false);

  const [Data, setData] = useState([]);

  const [Mounted,setMounted] = useState(1);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",latitude:"",longitude:"",addr:"",s_version:"",h_c_m:"",h_p_m:"",h_b_m:"",h_w_m:"",enabled:""});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
      sortable:false,
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
    
    fetchGet("/devicelist",{credentials: 'include'})
    .then((data) => {        
      setData(data)
    });
    
    
  }, [Mounted]);

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  function openRegisterDialog(){
    setRegistDialog(true)
  }

  function closeRegisterDialog(){
    setRegistDialog(false)
  }

  function openUpdateDialog(){
    setUpdateDialog(true)
  }

  function closeUpdateDialog(){
    setUpdateDialog(false)
    // setSelectedItemId(null)
  }

  function openRemoveDialog(){
    setRemoveDialog(true)
  }

  function closeRemoveDialog(){
    setRemoveDialog(false)
    // setSelectedItemId(null)
  }

  return (
    <Box m="20px">
      <Header title="충전기 기본 정보" subtitle="충전기의 위치와 내장 정보 및 사용여부를 확인할 수 있습니다" />
      <b>기본정보에 등록하지 않은 충전기는 작동하지 않습니다.</b>
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
        <DataGrid  rows={Data} columns={columns}  components={{ Toolbar: GridToolbar } }
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
        initialState={{
          sorting: {
            sortModel: [{ field: 'i_time', sort: 'desc' }],
          },
        }}

        />
      </Box>
      <Box
      m="20px 20px 0 0"
      display="flex"
      justifyContent="flex-end"
      >
        <Button variant="outlined" color="secondary" onClick={openRegisterDialog} 
        sx={
          {
            width:"5vw",
            height:"3vh"
          }
        }
        >등록</Button>
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
        <MenuItem onClick={()=>{closePositionMenu(); openUpdateDialog()}}>수정</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openRemoveDialog()}}>삭제</MenuItem>
      </Menu>



      <Dialog
        open={RegistDialog}
        onClose={closeRegisterDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            for(var i = 0; i < Data.length; i ++){      // 기기명 중복확인
              if(Data[i].id === formJson.id){   
                
                alert("이미 있는 기기명 입니다.");
                
                return;
              }
            }
            
            fetchPost("/device/register",formJson)
            .then((data) =>{
              if(data.isInserted===true){
                
                closeRegisterDialog();

                setMounted(Mounted+1)
              }
              else {
                alert(data.errorMessage)
              }
            })


          },
        }}
      >
        <DialogTitle>기기 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            기기를 등록하기 위해선 아래의 정보들이 필요합니다.
          </DialogContentText>
          
          <TextField
            // autoFocus
            required
            margin="dense"
            label="기기명"
            name="id"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="위도"
            name="latitude"
            fullWidth
            type={"number"}
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="경도"
            name="longitude"
            fullWidth
            type={"number"}
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="주소"
            name="addr"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="소프트웨어버전"
            name="s_version"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="충전기모델"
            name="h_c_m"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="결제기모델"
            name="h_p_m"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="보드모델"
            name="h_b_m"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="날씨센서모델"
            name="h_w_m"
            fullWidth
            color="success"
            variant="standard"
          />
          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group">기기사용가능여부*</FormLabel>
          <RadioGroup
            row
            aaria-labelledby="demo-row-radio-buttons-group-label"
            name="enabled"
            defaultValue={"2"}
            required
          >
            <FormControlLabel value="1" control={<Radio />} label="가능" />
            <FormControlLabel value="2" control={<Radio />} label="보류" />
            <FormControlLabel value="3" control={<Radio />} label="불가" />
          </RadioGroup>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRegisterDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">추가하기</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={UpdateDialog}
        onClose={closeUpdateDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            for(var i = 0; i < Data.length; i ++){      // 기기명 중복확인
              if(Data[i].id === SelectedItemId.id){
                continue;
              }

              if(Data[i].id === formJson.id ){   
                
                alert("이미 있는 기기명 입니다.");
                
                return;
              }
            }
            
            fetchPost("/device/update",formJson)
            .then((json) => {           
              if(json.isUpdated===true){
                
                closeUpdateDialog();

                setMounted(Mounted+1)
              }
              else {
                alert(json.errorMessage)
              }
            });

          },
        }}
      >
        <DialogTitle>기기 수정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            기기의 데이터를 수정합니다.
          </DialogContentText>
          
          <TextField
            // autoFocus
            required
            margin="dense"
            label="기기명"
            name="id"
            fullWidth
            color="success"
            variant="standard"
            disabled={true}
            defaultValue={SelectedItemId.id}
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="위도"
            name="latitude"
            fullWidth
            type={"number"}
            color="success"
            variant="standard"
            defaultValue={SelectedItemId.latitude}
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="경도"
            name="longitude"
            fullWidth
            type={"number"}
            color="success"
            variant="standard"
            defaultValue={SelectedItemId.longitude}
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="주소"
            name="addr"
            fullWidth
            color="success"
            variant="standard"
            defaultValue={SelectedItemId.addr}
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="소프트웨어버전"
            name="s_version"
            fullWidth
            color="success"
            variant="standard"
            defaultValue={SelectedItemId.s_version}
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="충전기모델"
            name="h_c_m"
            fullWidth
            color="success"
            variant="standard"
            defaultValue={SelectedItemId.h_c_m}
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="결제기모델"
            name="h_p_m"
            fullWidth
            color="success"
            variant="standard"
            defaultValue={SelectedItemId.h_p_m}
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="보드모델"
            name="h_b_m"
            fullWidth
            color="success"
            variant="standard"
            defaultValue={SelectedItemId.h_b_m}
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="날씨센서모델"
            name="h_w_m"
            fullWidth
            color="success"
            variant="standard"
            defaultValue={SelectedItemId.h_w_m}
          />
          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group">기기사용가능여부*</FormLabel>
          <RadioGroup
            row
            aaria-labelledby="demo-row-radio-buttons-group-label"
            name="enabled"
            defaultValue={SelectedItemId.enabled==="정상"?"1":SelectedItemId.enabled==="보류"?"2":"3"}
            required
          >
            <FormControlLabel value="1" control={<Radio />} label="정상" />
            <FormControlLabel value="2" control={<Radio />} label="보류" />
            <FormControlLabel value="3" control={<Radio />} label="불가" />
          </RadioGroup>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">수정하기</Button>
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
              latitude:SelectedItemId.latitude,
              longitude:SelectedItemId.longitude,
            }

            fetchPost("/device/remove",deviceid)
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
        <DialogTitle>기기 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}의 데이터를 삭제하시겠습니까?
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

export default Team;
