import React from 'react'
import { Box,FormControl,Typography, useTheme } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../theme";


import { useState } from 'react';

import {fetchPost} from '../communication/handlefetch'


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

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import CustomTableSearcher from "../components/CustomTableSearcher";

import moment from 'moment';

const DeviceStateList = ({ isDashboard = false , Data, setMounted,TablePaginationFunc,SearchHandle,IsSearch = false}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [DialogPage, setDialogPage] = useState(0);

  const [ShowSettingsData,setShowSettingsData] = useState([]);

  const [ShowSettingsDialog,setShowSettingsDialog] = useState(false);
  const [TransactionDialog,setTransactionDialog] = useState(false);
  const [CacheDeleteDialog,setCacheDeleteDialog] = useState(false);
  const [RestartDialog,setRestartDialog] = useState(false);
  const [NVCatSettingsDialog,setNVCatSettingsDialog] = useState(false);
  const [NVCatRestartDialog,setNVCatRestartDialog] = useState(false);
  const [ConnectorEnabledDialog,setConnectorEnabledDialog] = useState(false);
  const [TriggerDialog,setTriggerDialog] = useState(false);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",conn:"",state:"",state_e:"",v_id:"",v_error:"",e_info:"",u_time:"",f_state:"",d_state:""});

  const [SelectedSettings,setSelectedSettings] = useState();

  const [anchorEl, setAnchorEl] = useState(null);

  const [TriggerRadio, setTriggerRadio] = useState(null);

  const open = Boolean(anchorEl);

  

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  function openShowSettingsDialog(){
    setShowSettingsDialog(true)
  }

  function closeShowSettingsDialog(){
    setShowSettingsDialog(false)
    setDialogPage(0);
    setSelectedSettings(undefined)
  }

  function openStartTransactionDialog(){
    setTransactionDialog(true)
  }

  function closeTransactionDialog(){
    setTransactionDialog(false)
  }

  function openCacheDeleteDialog(){
    setCacheDeleteDialog(true)
  }

  function closeCacheDeleteDialog(){
    setCacheDeleteDialog(false)
  }

  function openRestartDialog(){
    setRestartDialog(true)
  }

  function closeRestartDialog(){
    setRestartDialog(false)
  }

  function openNVCatSettingsDialog(){
    setNVCatSettingsDialog(true)
  }

  function closeNVCatSettingsDialog(){
    setNVCatSettingsDialog(false)
  }

  function openNVCatRestartDialog(){
    setNVCatRestartDialog(true)
  }

  function closeNVCatRestartDialog(){
    setNVCatRestartDialog(false)
  }

  function openConnectorEnabledDialog(){
    setConnectorEnabledDialog(true)
  }

  function closeConnectorEnabledDialog(){
    setConnectorEnabledDialog(false)
  }

  function openTriggerDialog(){
    setTriggerDialog(true)
  }

  function closeTriggerDialog(){
    setTriggerDialog(false)
  }

  function openSetConfigurationDialog(){
    console.log(SelectedSettings)
    if(SelectedSettings===undefined){
      alert("수정할 설정을 선택해주세요.")
      return
    }
  
    if(!SelectedSettings.readonly){
      setDialogPage(1);
    }else{
      alert("수정이 불가능한 설정입니다.")
    }
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
      renderCell: ({ row: { u_time } }) => {
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
            <Typography color={colors.grey[100]} sx={{ ml: "5px" , fontSize:"12px"}}>{u_time?  new Date(u_time).toLocaleString(): null}</Typography>
          </Box>
        );
      },
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
  


  const settingscolumns = [
    { 
      field: "key", 
      headerName: "설정명" ,
      headerAlign: "center",
      align: "center",
      flex: 1,
      cellClassName: "name-column--cell",
      
    },
    {
      field: "readonly",
      headerName: "쓰기권한여부",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { readonly } }) => {

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
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{readonly=== false ? "가능":"불가능"}</Typography>
          </Box>
        );
      },
    },
    {
      field: "value",
      headerName: "설정값",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
          MenuList={columns.filter((item) => (item.field !== "conn" && item.field !== "rowmenu"))}
          SearchHandle={SearchHandle}
        />
        
      </GridToolbarContainer>
    )
    
  }

  const changeProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);


      if(SelectedSettings.key=== "MeterValuesAlignedData"||SelectedSettings.key=== "MeterValuesSampledData"||SelectedSettings.key=== "StopTxnAlignedData"||SelectedSettings.key=== "StopTxnSampledData"){
        const arr = []
        for (const key of formData.keys()) {
          arr.push(key)
        }
        const sendformData = new FormData()
        sendformData.append("device_id",SelectedItemId.id)
        sendformData.append("key",SelectedSettings.key)
        sendformData.append("value",arr)
        const formJson = Object.fromEntries(sendformData.entries());
        

        fetchPost("/cmd/updatesettings",formJson)
        .then((data) =>{
          if(data?.isUpdated===true){
            
            closeShowSettingsDialog();
  
            setMounted()
          }
          else {
            alert(data?.errorMessage)
          }
        }).catch((err)=>{});
      }else{
        const formData = new FormData(event.currentTarget);
        formData.append("device_id",SelectedItemId.id)
        formData.append("key",SelectedSettings.key)
        const formJson = Object.fromEntries(formData.entries());
        
        
        fetchPost("/cmd/updatesettings",formJson)
        .then((data) =>{
          if(data?.isUpdated===true){
            
            closeShowSettingsDialog();
  
            setMounted()
          }
          else {
            alert(data?.errorMessage)
          }
        }).catch((err)=>{});

      }
    },
    
  }


  const startremoteProps = {
    
      component: 'form',
      onSubmit: (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("device_id", SelectedItemId.id)
        const formJson = Object.fromEntries(formData.entries());

        fetchPost("/cmd/rmstt",formJson)
        .then((data) =>{
          if(data?.isStarted===true){
            
            closeTransactionDialog();

            setMounted()

            alert(`실행한 충전승인번호 :  ${formJson.idTag}`)
          }
          else {
            alert(data?.errorMessage)
          }
        }).catch((err)=>{});


      },
    
  }

  const cachedeleteProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("device_id", SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/cmd/cc",formJson)
      .then((data) =>{
        if(data?.isCleared===true){
          
          closeCacheDeleteDialog();
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  
  }
  


  const restartProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append("device_id", SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/cmd/rs",formJson)
      .then((data) =>{
        if(data?.isReseted===true){
          
          closeRestartDialog();

          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  
  }

  const nvcatsettingsProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append("device_id", SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/cmd/ncs",formJson)
      .then((data) =>{
        if(data?.isSetting===true){
          
          closeNVCatSettingsDialog();

          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  
  }


  const nvcatrestartProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("device_id", SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/cmd/ncrs",formJson)
      .then((data) =>{
        if(data?.isReseted===true){
          
          closeNVCatRestartDialog();

          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  
  }

  const connectoreneabledProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append("device_id", SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/cmd/cgab",formJson)
      .then((data) =>{
        if(data?.isEnabled===true){
          
          closeConnectorEnabledDialog();

          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  
  }


  const triggerProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append("device_id", SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/cmd/tgmg",formJson)
      .then((data) =>{
        if(data?.isReceived===true){
          
          closeTriggerDialog();

          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  
  }



  return (
    <Box m={isDashboard ? "20px" : "0px"}>

      <Box
        m={isDashboard ?"20px 0 0 0":"40px 0 0 0"}
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
 
        <MenuItem onClick={()=>{closePositionMenu(); openRestartDialog()}}>충전기 재시작</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openConnectorEnabledDialog()}}>충전기 커넥터사용설정</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openTriggerDialog()}}>충전기 보고요청</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openStartTransactionDialog()}}>충전기 원격충전시작</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openNVCatSettingsDialog()}}>결제기 재설정</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openNVCatRestartDialog()}}>결제기 재시작</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openCacheDeleteDialog()}}>인증캐쉬 삭제</MenuItem>
        <MenuItem onClick={()=>{      /// 설정가지고오기 메뉴
          if(SelectedItemId.conn === true){
            const formJson = {
              device_id : SelectedItemId.id
            }
            
            fetchPost("/cmd/showsettings",formJson)
            .then((data) =>{
              if(data?.isShow===true){
                
                setShowSettingsData(data.data)
                closePositionMenu();
                openShowSettingsDialog();
              }
              else {
                alert(data?.errorMessage)
              }
            }).catch((err)=>{});
          }else{
            closePositionMenu();
            alert("해당 기기가 서버에 연결되지 않아 해당 항목을 가져올 수 없습니다.")
          }
          

        }}>설정 보기</MenuItem>
      </Menu>


      <Dialog
        open={ShowSettingsDialog}
        onClose={closeShowSettingsDialog}
        maxWidth="false"

        PaperProps={
          DialogPage === 1 ? changeProps: {}
        }
      >
        {
          DialogPage === 1 ? 
            <div>
            <DialogTitle>설정 수정</DialogTitle>
            <DialogContent>
              <DialogContentText>
                "{SelectedSettings.key}" 의 설정값을 수정합니다.
              </DialogContentText>
              <Box width="50vw">
                <p></p>
                <FormLabel id="demo-controlled-radio-buttons-group">설정값</FormLabel>
                <p></p>
                {SelectedSettings.key === "AllowOfflineTxForUnknownId"&& 
                <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="value" defaultValue={SelectedSettings.value} required>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
                }
                {SelectedSettings.key === "AuthorizationCacheEnabled"&& 
                <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="value" defaultValue={SelectedSettings.value} required>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
                }
                {SelectedSettings.key === "AuthorizeRemoteTxRequests"&& 
                <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="value" defaultValue={SelectedSettings.value} required>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
                }
                {SelectedSettings.key === "ClockAlignedDataInterval"&& 
                <TextField required margin="dense" label="설정값(초)" name="value" fullWidth color="success" defaultValue={SelectedSettings.value} variant="standard" type={"number"}/>
                }
                {SelectedSettings.key === "ConnectionTimeOut"&& 
                <TextField required margin="dense" label="설정값(초)" name="value" fullWidth color="success" defaultValue={SelectedSettings.value} variant="standard" type={"number"} />
                }
                {SelectedSettings.key === "HeartbeatInterval"&& 
                <TextField required margin="dense" label="설정값(초)" name="value" fullWidth color="success" defaultValue={SelectedSettings.value} variant="standard" type={"number"} />
                }
                {SelectedSettings.key === "LocalAuthorizeOffline"&& 
                <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="value" defaultValue={SelectedSettings.value} required>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
                }
                {SelectedSettings.key === "LocalPreAuthorize"&& 
                <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="value" defaultValue={SelectedSettings.value} required>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
                }
                {SelectedSettings.key === "MeterValuesAlignedData"&& 
                <FormControl>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox name="Current.Import" value="Current.Import" defaultChecked={SelectedSettings.value.includes("Current.Import")}/>} label="Current.Import"/>
                    <FormControlLabel control={<Checkbox name="Current.Offered" value="Current.Offered" defaultChecked={SelectedSettings.value.includes("Current.Offered")}/>} label="Current.Offered"/>
                    <FormControlLabel control={<Checkbox name="Energy.Active.Import.Register" value="Energy.Active.Import.Register" defaultChecked={SelectedSettings.value.includes("Energy.Active.Import.Register")}/>} label="Energy.Active.Import.Register"/>
                    <FormControlLabel control={<Checkbox name="Energy.Active.Import.Interval" value="Energy.Active.Import.Interval" defaultChecked={SelectedSettings.value.includes("Energy.Active.Import.Interval")}/>} label="Energy.Active.Import.Interval"/>
                    <FormControlLabel control={<Checkbox name="Power.Active.Import" value="Power.Active.Import" defaultChecked={SelectedSettings.value.includes("Power.Active.Import")}/>} label="Power.Active.Import"/>
                    <FormControlLabel control={<Checkbox name="Power.Offered" value="Power.Offered" defaultChecked={SelectedSettings.value.includes("Power.Offered")}/>} label="Power.Offered"/>
                    <FormControlLabel control={<Checkbox name="SoC" value="SoC" defaultChecked={SelectedSettings.value.includes("SoC")}/>} label="SoC"/>
                  </FormGroup>
                </FormControl>
                
                }
                {SelectedSettings.key === "MeterValuesSampledData"&& 
                <FormControl>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox name="Current.Import" value="Current.Import" defaultChecked={SelectedSettings.value.includes("Current.Import")}/>} label="Current.Import"/>
                    <FormControlLabel control={<Checkbox name="Current.Offered" value="Current.Offered" defaultChecked={SelectedSettings.value.includes("Current.Offered")}/>} label="Current.Offered"/>
                    <FormControlLabel control={<Checkbox name="Energy.Active.Import.Register" value="Energy.Active.Import.Register" defaultChecked={SelectedSettings.value.includes("Energy.Active.Import.Register")}/>} label="Energy.Active.Import.Register"/>
                    <FormControlLabel control={<Checkbox name="Energy.Active.Import.Interval" value="Energy.Active.Import.Interval" defaultChecked={SelectedSettings.value.includes("Energy.Active.Import.Interval")}/>} label="Energy.Active.Import.Interval"/>
                    <FormControlLabel control={<Checkbox name="Power.Active.Import" value="Power.Active.Import" defaultChecked={SelectedSettings.value.includes("Power.Active.Import")}/>} label="Power.Active.Import"/>
                    <FormControlLabel control={<Checkbox name="Power.Offered" value="Power.Offered" defaultChecked={SelectedSettings.value.includes("Power.Offered")}/>} label="Power.Offered"/>
                    <FormControlLabel control={<Checkbox name="SoC" value="SoC" defaultChecked={SelectedSettings.value.includes("SoC")}/>} label="SoC"/>
                  </FormGroup>
                </FormControl>
                }
                {SelectedSettings.key === "MeterValueSampleInterval"&& 
                <TextField required margin="dense" label="설정값(초)" name="value" fullWidth color="success" defaultValue={SelectedSettings.value} variant="standard" />
                }
                {SelectedSettings.key === "ResetRetries"&& 
                <TextField required margin="dense" label="설정값(횟수)" name="value" fullWidth color="success" defaultValue={SelectedSettings.value} variant="standard" />
                }
                {SelectedSettings.key === "StopTransactionOnEVSideDisconnect"&& 
                <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="value" defaultValue={SelectedSettings.value} required>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
                }
                {SelectedSettings.key === "StopTransactionOnInvalidId"&& 
                <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="value" defaultValue={SelectedSettings.value} required>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
                }
                {SelectedSettings.key === "StopTxnAlignedData"&& 
                <FormControl>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox name="Current.Import" value="Current.Import" defaultChecked={SelectedSettings.value.includes("Current.Import")}/>} label="Current.Import"/>
                    <FormControlLabel control={<Checkbox name="Current.Offered" value="Current.Offered" defaultChecked={SelectedSettings.value.includes("Current.Offered")}/>} label="Current.Offered"/>
                    <FormControlLabel control={<Checkbox name="Energy.Active.Import.Register" value="Energy.Active.Import.Register" defaultChecked={SelectedSettings.value.includes("Energy.Active.Import.Register")}/>} label="Energy.Active.Import.Register"/>
                    <FormControlLabel control={<Checkbox name="Energy.Active.Import.Interval" value="Energy.Active.Import.Interval" defaultChecked={SelectedSettings.value.includes("Energy.Active.Import.Interval")}/>} label="Energy.Active.Import.Interval"/>
                    <FormControlLabel control={<Checkbox name="Power.Active.Import" value="Power.Active.Import" defaultChecked={SelectedSettings.value.includes("Power.Active.Import")}/>} label="Power.Active.Import"/>
                    <FormControlLabel control={<Checkbox name="Power.Offered" value="Power.Offered" defaultChecked={SelectedSettings.value.includes("Power.Offered")}/>} label="Power.Offered"/>
                    <FormControlLabel control={<Checkbox name="SoC" value="SoC" defaultChecked={SelectedSettings.value.includes("SoC")}/>} label="SoC"/>
                  </FormGroup>
                </FormControl>
                }
                {SelectedSettings.key === "StopTxnSampledData"&& 
                <FormControl>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox name="Current.Import" value="Current.Import" defaultChecked={SelectedSettings.value.includes("Current.Import")}/>} label="Current.Import"/>
                    <FormControlLabel control={<Checkbox name="Current.Offered" value="Current.Offered" defaultChecked={SelectedSettings.value.includes("Current.Offered")}/>} label="Current.Offered"/>
                    <FormControlLabel control={<Checkbox name="Energy.Active.Import.Register" value="Energy.Active.Import.Register" defaultChecked={SelectedSettings.value.includes("Energy.Active.Import.Register")}/>} label="Energy.Active.Import.Register"/>
                    <FormControlLabel control={<Checkbox name="Energy.Active.Import.Interval" value="Energy.Active.Import.Interval" defaultChecked={SelectedSettings.value.includes("Energy.Active.Import.Interval")}/>} label="Energy.Active.Import.Interval"/>
                    <FormControlLabel control={<Checkbox name="Power.Active.Import" value="Power.Active.Import" defaultChecked={SelectedSettings.value.includes("Power.Active.Import")}/>} label="Power.Active.Import"/>
                    <FormControlLabel control={<Checkbox name="Power.Offered" value="Power.Offered" defaultChecked={SelectedSettings.value.includes("Power.Offered")}/>} label="Power.Offered"/>
                    <FormControlLabel control={<Checkbox name="SoC" value="SoC" defaultChecked={SelectedSettings.value.includes("SoC")}/>} label="SoC"/>
                  </FormGroup>
                </FormControl>
                }
                {SelectedSettings.key === "TransactionMessageAttempts"&& 
                <TextField required margin="dense" label="설정값(횟수)" name="value" fullWidth color="success" defaultValue={SelectedSettings.value} variant="standard" />
                }
                {SelectedSettings.key === "TransactionMessageRetryInterval"&& 
                <TextField required margin="dense" label="설정값(초)" name="value" fullWidth color="success" defaultValue={SelectedSettings.value} variant="standard" />
                }
                {SelectedSettings.key === "UnlockConnectorOnEVSideDisconnect"&& 
                <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="value" defaultValue={SelectedSettings.value} required>
                  <FormControlLabel value="true" control={<Radio />} label="true" />
                  <FormControlLabel value="false" control={<Radio />} label="false" />
                </RadioGroup>
                }
                {SelectedSettings.key === "WebSocketPingInterval"&& 
                <TextField required margin="dense" label="설정값(초)" name="value" fullWidth color="success" defaultValue={SelectedSettings.value} variant="standard" />
                }
                

              </Box>  
            </DialogContent>
            <DialogActions>
              <Button onClick={closeShowSettingsDialog} color="secondary">취소</Button>
              <Button type="submit" color="secondary">수정하기</Button>
            </DialogActions>
            </div>
          :
            <div style={{width : "50vw"}}>
            <DialogTitle>설정 보기</DialogTitle>
            <DialogContent>
              <DialogContentText>
                해당 기기가 설정되어있는 값을 보여줍니다.
              </DialogContentText>
              <Box width="50vw">
                <DataGrid rows={ShowSettingsData} columns={settingscolumns} getRowId={(row)=> row.key} hideFooter={true} rowSelection="single" onRowSelectionModelChange={(newSelection)=>{
                    ShowSettingsData.forEach((data)=>{
                      if(data?.key === newSelection[0]){
                        setSelectedSettings(data)
                      }
                    })

                  }}/>
              </Box>  
            </DialogContent>
            <DialogActions>
              <Button onClick={closeShowSettingsDialog} color="secondary">취소</Button>
              <Button onClick={openSetConfigurationDialog} color="secondary">수정하기</Button>
            </DialogActions>
            </div>

        }
         
      </Dialog>


      <Dialog
        open={TransactionDialog}
        onClose={closeTransactionDialog}
        PaperProps={
           startremoteProps
        }
      >
        
        <DialogTitle>원격충전 시작</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}의 충전을 원격으로 시작합니다.
          </DialogContentText>
          
          <TextField
            // autoFocus
            required
            margin="dense"
            label="커넥터ID"
            name="connectorId"
            fullWidth
            color="success"
            variant="standard"
            type={"number"}
            defaultValue={1}
            helperText="명령을 받을 충전기의 라인 Id입니다. 보통 충전기 왼쪽부터 1,2... 순으로 배정됩니다."
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="충전ID"
            name="idTag"
            fullWidth
            color="success"
            variant="standard"
            type={"number"}
            helperText="승인번호가 될 숫자Id 입니다. 기존 충전을 이어가고 싶으실 경우 바로 이전 충전만 가능하며 기존 충전이 아닌 새로운 임의 충전을 하실 경우 숫자 9자리로 맞춰주세요."
            // defaultValue={Math.floor(Math.random()*(999999999-10000000))+10000000}
            defaultValue={moment().format('HHmmssSSS')}
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTransactionDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">시작하기</Button>
        </DialogActions>

        
      </Dialog>

      <Dialog
        open={CacheDeleteDialog}
        onClose={closeCacheDeleteDialog}
        PaperProps={
           cachedeleteProps
        }
      >
        
        <DialogTitle>인증캐쉬삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}의 인증캐쉬를 모두 삭제합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCacheDeleteDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">삭제하기</Button>
        </DialogActions>

        
      </Dialog>

      <Dialog
        open={RestartDialog}
        onClose={closeRestartDialog}
        PaperProps={
           restartProps
        }
      >
        
        <DialogTitle>충전기 재시작</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}을 재시작합니다. 
          </DialogContentText>
          <DialogContentText color={colors.redAccent[100]}>
          {
              SelectedItemId.state === "Charging" ? "현재 해당 기기는 충전중입니다. 재시작시 진행중인 충전은 중지됩니다.":null
          }
          </DialogContentText>
          

          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group">재시작 타입*</FormLabel>
          <RadioGroup
            row
            aaria-labelledby="demo-row-radio-buttons-group-label"
            name="Type"
            defaultValue={"Soft"}
            required
          >
            <FormControlLabel value="Hard" control={<Radio />} label="하드웨어 재시작" />
            <FormControlLabel value="Soft" control={<Radio />} label="소프트웨어 재시작" />
          </RadioGroup>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRestartDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">재시작하기</Button>
        </DialogActions>

        
      </Dialog>


      <Dialog
        open={NVCatSettingsDialog}
        onClose={closeNVCatSettingsDialog}
        PaperProps={
           nvcatsettingsProps
        }
      >
        
        <DialogTitle>결제기 재설정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}의 결제기의 설정값을 재설정합니다.
          </DialogContentText>
          
          <TextField
            // autoFocus
            required
            margin="dense"
            label="CATID"
            name="Catid"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="사업자번호"
            name="Bizno"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="결제서버IP"
            name="NVCAT_Setting_Serverip"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="결제서버PORT"
            name="NVCAT_Setting_ServerPort"
            fullWidth
            color="success"
            variant="standard"
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNVCatSettingsDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">재설정하기</Button>
        </DialogActions>

        
      </Dialog>


      <Dialog
        open={NVCatRestartDialog}
        onClose={closeNVCatRestartDialog}
        PaperProps={
           nvcatrestartProps
        }
      >
        <DialogTitle>결제기 재시작</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}의 결제기를 재시작합니다.
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNVCatRestartDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">재시작하기</Button>
        </DialogActions>

        
      </Dialog>


      <Dialog
        open={ConnectorEnabledDialog}
        onClose={closeConnectorEnabledDialog}
        PaperProps={
           connectoreneabledProps
        }
      >
        
        <DialogTitle>충전기 커넥터 사용설정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}의 커넥터 사용여부를 설정합니다.
          </DialogContentText>
          
          <TextField
            // autoFocus
            required
            margin="dense"
            label="커넥터ID"
            name="ConnectorId"
            fullWidth
            color="success"
            variant="standard"
            type={"number"}
            defaultValue={1}
            helperText="명령을 받을 충전기의 라인 Id입니다. 보통 충전기 왼쪽부터 1,2... 순으로 배정됩니다."
          />

          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group">설정 타입*</FormLabel>
          <RadioGroup
            row
            aaria-labelledby="demo-row-radio-buttons-group-label"
            name="Type"
            defaultValue={SelectedItemId.state==="Unavailable"?"Inoperative":"Operative"}
            required
          >
            <FormControlLabel value="Operative" control={<Radio />} label="가능" />
            <FormControlLabel value="Inoperative" control={<Radio />} label="불가능" />
          </RadioGroup>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConnectorEnabledDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">설정하기</Button>
        </DialogActions>

        
      </Dialog>


      <Dialog
        open={TriggerDialog}
        onClose={closeTriggerDialog}
        PaperProps={
           triggerProps
        }
      >
        
        <DialogTitle>충전기 보고 요청</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.id}에게 다음과 같은 보고를 요청할 수 있습니다.
          </DialogContentText>

          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group">요청 타입*</FormLabel>
          <RadioGroup
            row = {false}
            aaria-labelledby="demo-row-radio-buttons-group-label"
            name="requestedMessage"
            defaultValue={"Heartbeat"}
            required
            onChange={(e)=>{
              if(e.target.defaultValue==="MeterValues"){
                setTriggerRadio(true)
              }else{
                setTriggerRadio(false)
              }
              
            }}  
          >
            <FormControlLabel value="Heartbeat" control={<Radio />} label="하트비트" />
            <FormControlLabel value="BootNotification" control={<Radio />} label="시작보고 - 기기이용가능여부가 대기에서 수정됬을때 상태를 업데이트합니다." />
            <FormControlLabel value="DiagnosticsStatusNotification" control={<Radio />} label="진단파일업로드현황" />
            <FormControlLabel value="FirmwareStatusNotification" control={<Radio/>} label="소프트웨어업데이트현황" />
            <FormControlLabel value="MeterValues" control={<Radio />} label="충전중일때 : 현재 충전중인 데이터값 현황" />
            <FormControlLabel value="StatusNotification" control={<Radio />} label="현 기기 상태 현황" />
          </RadioGroup>
          <p></p>

          {
            TriggerRadio?
            <TextField
              required
              margin="dense"
              label="커넥터ID"
              name="ConnectorId"
              fullWidth
              color="success"
              variant="standard"
              type={"number"}
              defaultValue={1}
              helperText="요청을 받을 충전기의 라인 Id입니다. 보통 충전기 왼쪽부터 1,2... 순으로 배정됩니다."
            />
            :
            null
          }
          

          
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTriggerDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">요청하기</Button>
        </DialogActions>

        
      </Dialog>

        {/* <DataGrid checkboxSelection rows={Data} columns={columns} components={{ Toolbar: GridToolbar }} /> */}
        <DataGrid  
          rows={Data&&Data.length? Data:[]}
          columns={isDashboard? columns.slice(0,-1):columns} 
          hideFooter={isDashboard} 
          components={IsSearch?{Toolbar: CustomToolBar}:{ Toolbar: isDashboard? null:CustomToolBar , Pagination : isDashboard? null:TablePaginationFunc}} 
          disableColumnMenu
          disableColumnFilter
          />
      </Box>
    </Box>
  );
};



export default React.memo(DeviceStateList);

