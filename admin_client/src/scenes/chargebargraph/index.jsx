import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/ChargeBarChart";

// import { useEffect } from 'react';
import { useState , useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";   
import { format } from 'date-fns';

import {fetchGet} from "../../communication/handlefetch"


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Bar = () => {

  const defalutDay = new Date();

  const [PickerDate,setPickerDate] = useState(new Date());

  const [DateType, setDateType] = useState("Y");
  const [StartTime, setStartTime] = useState(format(defalutDay,'yyyy-1-1 00:00:00'));
  const [EndTime, setEndTime] = useState(format(defalutDay,'yyyy-MM-dd 23:59:59'));
  const [Device,setDevice] = useState("전체");

  const [DeviceList, setDeviceList] = useState([]);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;


  const handleClickRadioBtn = (e) => {
    setDateType(e.target.value)

    const finalday = new Date(PickerDate.getYear(),PickerDate.getMonth()+1,0).getDate();

    if(e.target.value === "Y"){
      setEndTime(format(new Date(StartTime),'yyyy-12-'+finalday+' 23:59:59'))
    }else if(e.target.value === "M"){
      setEndTime(format(new Date(StartTime),'yyyy-MM-'+finalday+' 23:59:59'))
    }else{
      setEndTime(format(new Date(StartTime),'yyyy-MM-dd 23:59:59'))
    }
    
  }

  const handleClickDatePicker= (date) => {

    setPickerDate(date)
    setStartTime(format(new Date(date),'yyyy-MM-dd')+" 00:00:00")
    var finalday = new Date(date.getYear(),date.getMonth()+1,0).getDate();

    if(DateType === "Y"){
      setEndTime(format(new Date(date),'yyyy-12-'+finalday+' 23:59:59'))
    }else if(DateType === "M"){
      setEndTime(format(new Date(date),'yyyy-MM-'+finalday+' 23:59:59'))
    }else{
      setEndTime(format(new Date(date),'yyyy-MM-dd 23:59:59'))
    }
  }

  const openPositionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };


  useEffect(() => {

    fetchGet("/charge_daily_graph_list")
    .then((data) => {      
        setDeviceList(data)
    });
  }, []);


  return (
    <Box m="20px">
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={closePositionMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem key="전체" selected={"전체" === Device} onClick={()=> {closePositionMenu(); setDevice("전체")}}>
            전체
        </MenuItem>
        {DeviceList.map((item) => (
          <MenuItem key={item.device_id} selected={item.device_id === Device} onClick={()=> {closePositionMenu(); setDevice(item.device_id)}}>
            {item.device_id}
          </MenuItem>
        ))}
      </Menu>



      <Header title="충전기 그래프 조회" subtitle="기간별 충전기 데이터를 그래프로 조회합니다" />
      <Box display="flex" flexDirection="vertical" alignItems="center" gap="10vw">
        <div>
          <label><input type={"radio"} value="Y" checked={DateType === "Y"} onChange={handleClickRadioBtn} />년</label>
          <label><input type={"radio"} value="M" checked={DateType === "M"} onChange={handleClickRadioBtn} />월</label>
          <label><input type={"radio"} value="D" checked={DateType === "D"} onChange={handleClickRadioBtn} />일</label>
        </div>
        <div>
          <label>
            조회일자 :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {
            DateType === "Y" ?
              <DatePicker 
                locale={ko}
                maxDate={new Date()}
                selected={StartTime}
                onChange={handleClickDatePicker}
                showYearPicker
                dateFormat= "yyyy"
              />
            : DateType === "M" ?
              <DatePicker 
                locale={ko}
                maxDate={new Date()}
                selected={StartTime}
                onChange={handleClickDatePicker}
                showMonthYearPicker
                dateFormat= "yyyy-MM"
              />
            :
              <DatePicker
                locale={ko} 
                maxDate={new Date()}
                selected={StartTime}
                onChange={handleClickDatePicker}
                dateFormat= "yyyy-MM-dd"
              />
          }
          </label>
          
        </div>
        <label>
          검색 기기 :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={openPositionMenu}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {Device}
          </Button>

        </label>
        
        <div>

        </div>
      </Box>
      
      <Box height="80vh">
        <BarChart StartTime = {StartTime} EndTime = {EndTime} Device = {Device}/>
      </Box>
      
    </Box>
  );
};

export default Bar;
