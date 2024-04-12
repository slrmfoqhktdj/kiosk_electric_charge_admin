import { Box, useTheme } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { tokens } from "../../theme";


import Header from "../../components/Header";
import { useEffect } from 'react';
import { useState } from 'react';

import {fetchFile, fetchGet} from "../../communication/handlefetch"

import  Button  from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [PoleData, setPoleData] = useState([]);
  const [TwinData, setTwinData] = useState([]);

  const [PoleDialog,setPoleDialog] = useState(false);
  const [TwinDialog,setTwinDialog] = useState(false);

  const [files, setFiles] = useState();

  const [Mounted,setMounted] = useState(1);


  function openPoleDialog(){
    setPoleDialog(true)
  }

  function closePoleDialog(){
    setFiles(undefined)
    setPoleDialog(false)
  }

  function openTwinDialog(){
    setTwinDialog(true)
  }

  function closeTwinDialog(){
    setFiles(undefined)
    setTwinDialog(false)
  }

  const handleFilesChange = (e) => {
      setFiles(e.target.files[0]);
  }


  const columns = [
    { 
      field: "id", 
      headerName: "파일명" ,
      headerAlign: "center",
      flex: 1,
      align: "center",
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "version",
    //   headerName: "버전",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "u_time",
      headerName: "업로드날짜",
      flex: 1,
      headerAlign: "center",
      align: "center",
    }
  
  ];


  useEffect(() => {
    
    fetchGet("/apkfilelist")
      .then((data) => {    
        setPoleData(data.pole)   
        setTwinData(data.twin)
      });
  }, [Mounted]);



  return (
    <Box m="20px">
      <Header title="프로그램 업로드" subtitle="충전기를 업데이트 할 프로그램을 업로드 할 수 있습니다" />
      <h4>pole</h4>
      <Box
        m="20px 0 0 0"
        height="25vh"
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
        }}
      >
        <DataGrid rows={PoleData} columns={columns} hideFooter={true}/>
      </Box>

      <Box
      m="20px 20px 0 0"
      display="flex"
      justifyContent="flex-end"
      >
        <Button variant="outlined" color="secondary" onClick={openPoleDialog}
        sx={
          {
            width:"5vw",
            height:"3vh"
          }
        }
        >추가</Button>

      </Box>


      <h4>twin</h4>
      <Box
        m="20px 0 0 0"
        height="25vh"
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
        }}
      >
        <DataGrid rows={TwinData} columns={columns} hideFooter={true}/>
      </Box>

      <Box
      m="20px 20px 0 0"
      display="flex"
      justifyContent="flex-end"
      >
        <Button variant="outlined" color="secondary" onClick={openTwinDialog}
        sx={
          {
            width:"5vw",
            height:"3vh"
          }
        }
        >추가</Button>

      </Box>


      <Dialog
        open={PoleDialog}
        onClose={closePoleDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {

            e.preventDefault();
            const formData = new FormData();
            formData.append("apkfile",files)

            
            if(files === undefined){
              return alert("파일을 선택해주세요");
            }

            fetchFile('/upload/pole', formData)
            .then((data) =>{

              
              if(data.isUploaded===true){
                
                closePoleDialog();

                setMounted(Mounted+1)
              }
              else {
                alert(data.errorMessage)
              }
            }).catch((err) => {
                console.error(err);
            });


          },
        }}
      >
        <DialogTitle>Pole 프로그램 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            기기가 업데이트할 프로그램을 업로드합니다.
          </DialogContentText>
          <Box
          m="20px 20px 0 0"
          display="flex"
          justifyContent="center"
          >
          <form encType="multipart/form-data">
            <input 
              // name="file"
              className='file-input'
              type="file"
              onChange={handleFilesChange}
              accept=".apk"
              required
            />
          </form>
          </Box>
          

          
        </DialogContent>
        <DialogActions>
          <Button onClick={closePoleDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">업로드</Button>
        </DialogActions>
      </Dialog>





      <Dialog
        open={TwinDialog}
        onClose={closeTwinDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {

            e.preventDefault();
            const formData = new FormData();
            formData.append("apkfile",files)

            
            if(files === undefined){
              return alert("파일을 선택해주세요");
            }

            fetchFile('/upload/twin', formData)
            .then((data) =>{
              if(data.isUploaded===true){
                
                closeTwinDialog();

                setMounted(Mounted+1)
              }
              else {
                alert(data.errorMessage)
              }
            }).catch((err) => {
                console.error(err);
            });


          },
        }}
      >
        <DialogTitle>Twin 프로그램 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            기기가 업데이트할 프로그램을 업로드합니다.
          </DialogContentText>
          <Box
          m="20px 20px 0 0"
          display="flex"
          justifyContent="center"
          >
          <form encType="multipart/form-data">
            <input 
              // name="file"
              className='file-input'
              type="file"
              onChange={handleFilesChange}
              accept=".apk"
              required
            />
          </form>
          </Box>
          

          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTwinDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">업로드</Button>
        </DialogActions>
      </Dialog>
    </Box>





  );
};

export default Team;
