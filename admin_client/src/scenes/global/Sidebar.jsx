import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import TvIcon from '@mui/icons-material/Tv';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import RoomIcon from '@mui/icons-material/Room';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import CardMembershipIcon from '@mui/icons-material/CardMembershipOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideoOutlined';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import FileUploadIcon from '@mui/icons-material/FileUploadOutlined';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGoOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearchOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title)
        // window.sessionStorage.setItem("title",title);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [selected, setSelected] = useState(window.sessionStorage.getItem('title'));
  const [selected, setSelected] = useState("대시보드");

  // setSelected(window.sessionStorage.getItem('title'))
  // console.log("path = "+window.sessionStorage.getItem('title')===null? "is null ": window.sessionStorage.getItem('title'))

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              {/* <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  // style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box> */}
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  IF
                </Typography>
                {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography> */}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              모니터링
            </Typography>

            <Item
              title="대시보드"
              to="/"
              icon={<DashboardIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="설치위치 맵"
              to="/devicemap"
              icon={<RoomIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              기기관리
            </Typography>
            <Item
              title="기기 정보 및 상태"
              to="/team"
              icon={<TvIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              충전관리
            </Typography>
            <Item
              title="충전기 기본 정보"
              to="/devicelist"
              icon={<TvIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="충전기 상태 정보"
              to="/devicestatelist"
              icon={<DeviceUnknownIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="충전요금 단가 관리"
              to="/pricelist"
              icon={<CardMembershipIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              업데이트관리
            </Typography>

            <Item
              title="프로그램 업로드"
              to="/apkup"
              icon={<FileUploadIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="충전기 업데이트"
              to="/deviceupdate"
              icon={<SystemUpdateAltIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              광고관리
            </Typography>
            <Item
              title="광고물 업로드"
              to="/adupload"
              icon={<FeaturedVideoIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="충전기별 광고 관리"
              to="/admng"
              icon={<AutoAwesomeMotionIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              진단관리
            </Typography>
            <Item
              title="진단파일 요청"
              to="/logcmd"
              icon={<ContentPasteGoIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="진단파일 관리"
              to="/loglist"
              icon={<ContentPasteSearchIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
          

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              정산/지표분석
            </Typography>
            <Item 
              title="충전량 및 이력 조회"
              to="/chargehistory"
              icon={<ManageSearchIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="일자별 충전량 조회"
              to="/chargedaily"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="충전기 그래프 조회"
              to="/chargebargraph"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item 
              title="충전기 장애이력"
              to="/errorlist"
              icon={<ErrorOutlineIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Item
              title="매출실적 및 정산 조회"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              환경설정
            </Typography>

            {/* <Item
              title="사용자 관리/권한"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            
            <Item
              title="공통코드"
              to="/publiccode"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
