import React  from 'react'
import { Fragment } from 'react'
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { Axes } from "@nivo/axes";
import { line } from "d3-shape";
import { computeXYScalesForSeries } from "@nivo/scales";
import { useTooltip, TableTooltip } from "@nivo/tooltip";
import { BoxLegendSvg } from "@nivo/legends";

// 라인 색
const lineColor = "rgba(255, 113, 113, 1)";
const lineColor2 = "rgba(80, 175, 73, 1)";

// 바 색
const colorsbar = {
  amount: "rgba(255, 255, 108, 0.8)",
};
const getColor = (bar) => colorsbar[bar.id];




// 
const customLegendSpec = {
  anchor: "bottom",
  direction: "row",
  itemHeight: 20,
  itemWidth: 80,
  translateY: 80,
  translateX: 0,
  symbolShape: "circle",
  symbolSize: 10
};


  // 차트 설명
  const CustomLegend = (props) => {

    return (
      <BoxLegendSvg
        {...customLegendSpec}
        
        containerWidth={props.innerWidth}
        containerHeight={props.innerHeight}
        data={
          [
            {
              id:"amount",
              label:"충전량",
              color:colorsbar["amount"],

            },
            {
              id:"pay",
              label:"매출액",
              color:lineColor2,
            },
            {
              id:"count",
              label:"횟수",
              color:lineColor,
            },
          ]
        }
      />
    );
  };



  // 오버 시 나타나는 메시지
function CustomTooltip({ timeValue, amountValue, countValue , payValue }) {
  return (
    <TableTooltip
      rows={[
        ["시간", timeValue],
        ["충전량", amountValue],
        ["횟수", countValue],
        ["매출액", payValue]
      ]}
    />
  );
}




const ChargeBarChart = ({ isDashboard = false , Data}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [DateType, setDateType] = useState();
  // const [DStartTime, setStartTime] = useState(StartTime);
  // const [DEndTime, setEndTime] = useState(EndTime);
  // const [DDeviceType, setDeviceType] = useState(DeviceType);

  // const [Data, setData] = useState([]);

  // console.log(StartTime + EndTime + DeviceType)

  

  // useEffect(() => {
  //   const userData = {
  //     starttime: StartTime,
  //     endtime:EndTime,
  //     device_id:Device,
  //     // devicetype:DeviceType
  //   };

  //   fetchPost("/charge_daily_graph",userData)
  //   .then((data) => {        
  //       setData(data)
  //   });
  // }, [StartTime,EndTime,Device]);


  // 라인 그리기
  const Line = ({ bars, xScale, innerWidth, innerHeight, tooltip }) => {

    const scale = computeXYScalesForSeries(
      [
        {
          id: "count",
          data: Data&&Data.length? Data.map((it) => ({ x: it.time, y: it.count  })) :[]
        }
      ],
      { type: "linear" },
      { type: "linear" },
      innerWidth,
      innerHeight
    );

    const scale2 = computeXYScalesForSeries(
      [
        {
          id: "pay",
          data: Data&&Data.length?  Data.map((it) => ({ x: it.time, y: it.pay  })) :[]
        }
      ],
      { type: "linear" },
      { type: "linear" },
      innerWidth,
      innerHeight
    );
  
    
    // 선그리기
    const lineGenerator = line()
      // .x((bar) =>  bar.x + bar.width / 2 )
      .x((bar) => {
        // console.log(bar.data.index);    
         return bar.x+ bar.width / 2 
        })
      .y((bar) => {
        // console.log(bar.data.data.count);     
        if(bar.data.data.count === "0" ) return scale.yScale(0)
        return typeof bar.data.data.count == "undefined"?scale.yScale(0):scale.yScale(bar.data.data.count)
    });
    const lineGenerator2 = line()
      .x((bar) => { 
         return  bar.x+ bar.width / 2 
        })
      .y((bar) => { 
        if(bar.data.data.pay === "0" ) return scale.yScale(0)
        return typeof bar.data.data.pay == "undefined" ?scale2.yScale(0):scale2.yScale(bar.data.data.pay)
    });

    
  
    const tip = useTooltip();
  
    function renderTip(e, idx) {

      return tip.showTooltipFromEvent(
        <CustomTooltip timeValue={Data&&Data.length?  Data[idx].time : null} amountValue={Data&&Data.length?   Data[idx].amount : null} countValue={Data&&Data.length?  Data[idx].count : null} payValue={Data&&Data.length?  Data[idx].pay: null} />,
        e
      );
    }
    
    return (
      <Fragment>
        {/* y좌표  */}
        
        <Axes
          yScale={scale.yScale}
          xScale={xScale}
          width={innerWidth}
          height={innerHeight}
          right={{
            ticksPosition: "after",
            legend:"횟수",
            legendPosition:"middle",
            legendOffset: 30,
            
          }}
        />
        <Axes
          yScale={scale2.yScale}
          xScale={xScale}
          width={innerWidth + 50}
          height={innerHeight}
          right={{
            ticksPosition: "after",
            legend:"매출액",
            legendPosition:"middle",
            legendOffset: 30,
          }}
        />
        {/* 선삽입 */}
        <path
          d={lineGenerator(bars)}
          fill="none"
          stroke={lineColor}
          style={{ pointerEvents: "none" ,strokeWidth:"3"}}
        />
        <path
          d={lineGenerator2(bars)}
          fill="none"
          stroke={lineColor2 }
          style={{ pointerEvents: "none" ,strokeWidth:"3"}}
        />

        {/* 선 꼭짓점 */}
        {bars.map((bar) => (
          <circle
            key={bar.key}
            cx={xScale(bar.data.index) + bar.width / 2}
            cy={typeof bar.data.data.count == "undefined"|| bar.data.data.count === "0" ? scale.yScale(0)  : scale.yScale(bar.data.data.count)}
            r={3}
            fill={lineColor}
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
          
        ))}
        {bars.map((bar) => (
          <circle
            key={bar.key}
            cx={xScale(bar.data.index) + bar.width / 2}
            cy={typeof bar.data.data.pay == "undefined" || bar.data.data.pay === "0" ?  scale.yScale(0)  : scale2.yScale(bar.data.data.pay)}
            r={3}
            fill={lineColor2}
            stroke={lineColor2}
            style={{ pointerEvents: "none" }}
          />

          
        ))}
        
        {bars.map((bar, idx) => (
          <rect
            key={bar.key}
            x={bar.x}
            y={0}
            height={innerHeight}
            width={bar.width}
            fill="transparent"
            onMouseEnter={(e) => renderTip(e, idx)}
            onMouseMove={(e) => renderTip(e, idx)}
            onMouseLeave={tip.hideTooltip}
          />
        ))}


      </Fragment>
    );
  };





 

  return (
    <ResponsiveBar
      // groupMode="grouped"
      data={Data&&Data.length? Data:[]}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip:{
          container:{
            // backgroundColor:colors.blueAccent[700],  // 바탕
            color:"black", // 글자색
          },

          
        }
        
      }}
      keys={["amount"]}
      indexBy="time"
      // maxValue={6} //최댓값

      margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      // colors={{ scheme: "nivo" }}    // nivo 기본
      colors={getColor}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "시간", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "충전량", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      // enableGridY={true}  // 바탕선 기본 true
      // legends={[
        
      //   {
      //     dataFrom: "keys",
      //     // data:["hi"],
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 120,
      //     translateY: 0,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: "left-to-right",
      //     itemOpacity: 0.85,
      //     symbolSize: 20,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
      role="application"
      barAriaLabel={function (e) {
        return e.time + ": " + e.formattedValue + " in country: " + e.indexValue;
        
      }}
      // tooltip={pointer =>{
      //   return <div width="10%" height="10%">{pointer}</div>
      // }}

      layers={["grid", "axes", "bars", Line,CustomLegend,"markers"]}
      // layers={["grid", "axes", "bars",  "legends"]}
    />
  );
};

export default React.memo(ChargeBarChart);