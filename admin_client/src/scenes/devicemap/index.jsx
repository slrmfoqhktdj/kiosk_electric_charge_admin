import { Box, useTheme } from "@mui/material";
// import GeographyChart from "../../components/GeographyChart";
import DeviceMap from "../../components/DeviceMap";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="설취위치 맵" subtitle="현재 설치된 충전기의 위치를 지도로 표시합니다" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        {/* <GeographyChart /> */}
        <DeviceMap/>
      </Box>
    </Box>
  );
};

export default Geography;
