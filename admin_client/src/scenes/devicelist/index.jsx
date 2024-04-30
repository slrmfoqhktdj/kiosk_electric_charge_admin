import { Box} from "@mui/material";


import Header from "../../components/Header";
import { useState , useCallback , useEffect } from 'react';

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
import TablePagination from "@mui/material/TablePagination";
import DeviceListComponent from "../../components/DeviceList";

// import { height } from "@mui/system";

const DeviceList = () => {


  const [RegistDialog,setRegistDialog] = useState(false);
  const [Data, setData] = useState([]);
  const [Mounted,setMounted] = useState(1);

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

  const SearchHandle = (column ,data) => {
    console.log(data)

    if(!data||data===""){
      setIsSearch(false)
      setPage(0)
      getPageData()
    }else{
      setIsSearch(true)

      fetchGet(`/devicelist/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.item)
          setDataCount(data?.item?.length)
      });
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


  const getPageData = useCallback(async () => {
    fetchGet(`/devicelist/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
    .then((data) => {        
      setData(data?.item)
      setDataCount(data?.count)
    });
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData()
  }, [Mounted,getPageData]);

  const changeMounted = () => setMounted(Mounted+1);


  function openRegisterDialog(){
    setRegistDialog(true)
  }

  function closeRegisterDialog(){
    setRegistDialog(false)
  }




  const registerProps =
  {
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());


      if(Data&&Data.length){
        for(var i = 0; i < Data.length; i ++){      // 기기명 중복확인
          if(Data[i].id === formJson.id){   
            
            alert("이미 있는 기기명 입니다.");
            
            return;
          }
        }
      }
      
      
      fetchPost("/device/register",formJson)
      .then((data) =>{
        if(data.isInserted===true){
          
          closeRegisterDialog();

          changeMounted();
          
        }
        else {
          alert(data.errorMessage)
        }
      })


    },
  }

 
  

  return (
    <Box m="20px">
      
      <Box>
        <Header title="충전기 기본 정보" subtitle="충전기의 위치와 내장 정보 및 사용여부를 확인할 수 있습니다" />
        <b>기본정보에 등록하지 않은 충전기는 작동하지 않습니다.</b>
      </Box>  

      <DeviceListComponent Data={Data} setMounted = {changeMounted} TablePaginationFunc={TablePaginationFunc}  SearchHandle={SearchHandle} IsSearch={IsSearch}/>
      
      
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
      

      <Dialog
        open={RegistDialog}
        onClose={closeRegisterDialog}
        PaperProps={registerProps}
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
      
    </Box>
  );
};

export default DeviceList;
