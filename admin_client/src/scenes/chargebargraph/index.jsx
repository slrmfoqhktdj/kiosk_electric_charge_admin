import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/ChargeBarChart";

// import { useEffect } from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";   
import { format } from 'date-fns';


const Bar = () => {

  const defalutDay = new Date();

  const [PickerDate,setPickerDate] = useState(new Date());

  const [DateType, setDateType] = useState("Y");
  const [StartTime, setStartTime] = useState(format(defalutDay,'yyyy-1-1 00:00:00'));
  const [EndTime, setEndTime] = useState(format(defalutDay,'yyyy-MM-dd 23:59:59'));
  // const [DeviceType, setDeviceType] = useState();


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

  return (
    <Box m="20px">
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
        <div>

        </div>
      </Box>
      
      <Box height="80vh">
        <BarChart StartTime = {StartTime} EndTime = {EndTime}/>
        
      </Box>
      
    </Box>
  );
};

export default Bar;
