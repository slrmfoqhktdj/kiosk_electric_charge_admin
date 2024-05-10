import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeviceMap from "../../components/DeviceMap";

import { useEffect , useState } from 'react';

import ChargeBarChart from "../../components/ChargeBarChart";
import DeviceList from "../../components/DeviceList";
import DeviceStateList from "../../components/DeviceStateList";
import PriceList from "../../components/PriceList";
import ChargeDaily from "../../components/ChargeDaily";

import {useNavigate} from 'react-router-dom'
import {fetchMainGet} from '../../communication/handlefetch'

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Data, setData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => { 
    fetchMainGet("/dashboarddata",{credentials: 'include'})
    .then((data) => {        
      setData(data)
    }).catch((err)=>{});
  }, []);


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="대쉬보드" subtitle="충전기에 대한 정보들을 간랸히 보여줍니다." />

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/devicelist')}}>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                m={"0 0 20px 0 "}
                
              >
                충전기 기본 정보
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
            </div>
           
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <DeviceList isDashboard={true} Data={Data?.list}/>
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/devicestatelist')}}>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                m={"0 0 20px 0 "}
              >
                충전기 상태 정보
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
            </div>
           
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <DeviceStateList isDashboard={true} Data={Data?.state}/>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/pricelist')}}>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                m={"0 0 20px 0 "}
              >
                요금 단가
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
            </div>
           
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <PriceList isDashboard={true} Data={Data?.price}/>
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ROW 3 */}
        
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/chargedaily')}} >
              <Typography
                variant="h5"
                fontWeight="600"
                // sx={{ padding: "30px 30px 0 30px" }}
                color={colors.grey[100]}
                m={"0 0 20px 0"}
              >
                일자별 충전량
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
              <p></p>
            </div>

          </Box>
          <Box height="250px" mt="-20px">
            <ChargeDaily isDashboard={true} Data={Data?.daily}/>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/chargebargraph')}}>
              <Typography
                variant="h5"
                fontWeight="600"
                // sx={{ padding: "30px 30px 0 30px" }}
                color={colors.grey[100]}
                m={"0 0 20px 0"}
              >
                최근 3일 전체 충전기 그래프
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
            </div>
          </Box>
          <Box height="250px" mt="-20px">
            <ChargeBarChart isDashboard={true} Data = {Data?.graph}/>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // padding="30px"
        >

          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/devicemap')}}>
              <Typography
                variant="h5"
                fontWeight="600"
                // sx={{ marginBottom: "15px" }}
                color={colors.grey[100]}
                m={"0 0 20px 0"}
              >
                설치위치
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
            </div>
          </Box>
          <Box height="250px" mt="-20px" p="30px">
            <DeviceMap isDashboard={true} Data = {Data?.maps}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
